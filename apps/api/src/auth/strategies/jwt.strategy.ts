import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { AuthService } from "../auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET', 'fallback_secret'),
        });
    }
    async validate(payload: AuthJwtPayload) {
        const userId = payload.sub;
        return this.authService.validateJwtPayload(userId);
    }
} 