import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/db-lib/user.dto.entity';
import { PasswordService } from '@app/auth/password/password.service';
import { TokenService } from '@app/auth/token/token.service';
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
    return this.userRepository.findOneBy({ email });
  }

  async create(user: User): Promise<string> {
    await this.throwIfUserExists(user.email);
    this.hashPassword(user);

    const createdUser = await this.createUserInDatabase(user);
    return this.tokenService.createToken(createdUser.email);
  }

  private async throwIfUserExists(email: string): Promise<void> {
    const userExists = await this.getUserByEmail(email);
    if (userExists) {
      throw new RpcException(
        new HttpException('User already exists', HttpStatus.BAD_REQUEST),
      );
    }
  }

  private hashPassword(user: User): void {
    const { password, salt } = this.passwordService.hash(user.password);
    user.password = password;
    user.salt = salt;
  }

  private createUserInDatabase(user: User): Promise<User> {
    const createdUser = this.userRepository.create(user);
    try {
      return this.userRepository.save(createdUser);
    } catch {
      throw new RpcException(
        new HttpException('Database error', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    }
  }
}
