import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'AccessKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    const accessToken = req.headers['authorization'].split(' ')[1];
    const isOut = await this.cacheManager.get(`accessToken:${accessToken}`);

    if (isOut) throw new UnauthorizedException();

    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
