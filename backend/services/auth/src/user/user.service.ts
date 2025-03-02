import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PasswordService } from 'src/password/password.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('PasswordService')
    private readonly passwordService: PasswordService,
    @Inject('TokenService')
    private readonly tokenService: TokenService,
  ) {}

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(user: User): Promise<string> {
    const userExists = await this.getUserByEmail(user.email);
    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }
    const passwordPayload = this.passwordService.hash(user.password);
    user.password = passwordPayload.password;
    user.salt = passwordPayload.salt;

    user = this.userRepository.create(user);
    user = await this.userRepository.save(user);
    return this.tokenService.createToken(user.email);
  }
}
