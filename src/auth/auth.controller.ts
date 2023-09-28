import { Body, Controller, Post } from "@nestjs/common";
import { IsPublic } from "src/common/decorators/is-public.decorator";
import { RegisterDTO } from "./dtos/register.dto";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dtos/login.dto";

@IsPublic()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async registerUser(@Body() userData: RegisterDTO) {
    return await this.authService.register(userData);
  }

  @Post("login")
  async loginUser(@Body() loginData: LoginDTO) {
    return await this.authService.login(loginData);
  }
}
