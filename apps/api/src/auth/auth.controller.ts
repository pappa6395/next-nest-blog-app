import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';
import { Response as Resp } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @UseGuards(GoogleAuthGuard)
    @Get("google/login")
    googleLogin() {

    }

    @UseGuards(GoogleAuthGuard)
    @Get("google/callback")
    async googleCallback(@Request() req, @Response() res: Resp) {
        //console.log('user:', req.user);
        const userData = await this.authService.login(req.user);

        res.redirect(
            `http://localhost:3000/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`);  // frontend API
    }

    @UseGuards(JwtAuthGuard)
    @Get('verify-token')
    verify() {
        return 'ok';
    }
}
