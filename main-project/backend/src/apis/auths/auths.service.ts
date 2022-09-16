import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly usersService: UsersService,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'RefreshKey', expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'AccessKey', expiresIn: '1h' },
    );
  }

  async loginSocial({ req, res }) {
    let user = await this.usersService.findOneByEmail({
      userEmail: req.user.email,
    });

    if (!user) user = await this.usersService.create({ ...req.user });

    this.setRefreshToken({ user, res });

    // 로그인하면 특정 페이지로 전환
    res.redirect('http://127.0.0.1:5500/personal/frontend/login/index.html');
  }
}
