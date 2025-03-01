import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PasswordService } from 'src/password/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async create(user: User): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }
    const passwordPayload = this.passwordService.hashPassword(user.password);
    user.password = passwordPayload.password;
    user.salt = passwordPayload.salt;

    user = this.userRepository.create(user);
    return this.userRepository.save(user).then((res) => {
      res.password = '';
      return res;
    });
  }

  async login(user: User): Promise<{ access_token: string }> {
    const remoteUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (
      !remoteUser ||
      !this.passwordService.validateService(user.password, {
        password: remoteUser.password,
        salt: remoteUser.salt,
      })
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.email };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
