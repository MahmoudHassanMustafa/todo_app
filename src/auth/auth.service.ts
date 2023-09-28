import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { RegisterDTO } from './dtos/register.dto';
import Password from './utils/password.helper';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationData: RegisterDTO) {
    const { password } = registrationData;
    registrationData.password = await Password.hash(password);

    await this.userRepository.createUser(registrationData);

    return { message: 'User registered successfully' };
  }

  async login({ email, password }: LoginDTO) {
    const user: User = await this.userRepository.findUser({ email });

    if (!user) throw new NotFoundException('User not found');

    // Validating the provided password
    const isValidPassword: boolean = await Password.compare(
      password,
      user.password,
    );
    if (!isValidPassword)
      throw new UnauthorizedException('Invalid login detials');

    const payload: JwtPayload = { id: user.id };

    return {
      message: 'Logged in successfully',
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
