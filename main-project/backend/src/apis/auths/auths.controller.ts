import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { IOAuthUser } from 'src/commons/type/context';

@Controller('login')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService, //
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authsService.loginSocial({ req, res });
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authsService.loginSocial({ req, res });
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authsService.loginSocial({ req, res });
  }
}
