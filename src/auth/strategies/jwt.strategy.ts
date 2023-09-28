import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { JWT } from "src/common/constants";
import { UserRepository } from "src/user/user.repository";
import { User } from "@prisma/client";
import { JwtPayload } from "../types/jwt-payload";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get<string>(JWT.SECRET),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findUser({ id: payload.id });

    if (!user) throw new UnauthorizedException("Unauthorized");

    return user;
  }
}
