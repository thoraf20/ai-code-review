/* eslint-disable prettier/prettier */
import { Controller, Req, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // GitHub OAuth login
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    return { msg: 'Redirecting to GitHub...' };
  }

  // GitHub OAuth callback
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(@Req() req) {
    return req.user;
  }
}
