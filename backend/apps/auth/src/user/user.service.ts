import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'libs/db-lib/src/user.dto.entity';
import { PasswordService } from '../password/password.service';
import { TokenService } from '../token/token.service';
import { RpcException } from '@nestjs/microservices';

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
      throw new RpcException(
        new HttpException('User already exists', HttpStatus.BAD_REQUEST),
      );
    }
    const passwordPayload = this.passwordService.hash(user.password);
    user.password = passwordPayload.password;
    user.salt = passwordPayload.salt;

    user = this.userRepository.create(user);
    user = await this.userRepository.save(user);
    return this.tokenService.createToken(user.email);
  }
}
