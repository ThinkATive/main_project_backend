import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      userName: profile.displayName,
      userPhone: '010-1122-3344',
      userEmail: profile.emails[0].value,
      userAddress: '어딘가',
      userGender: '여',
      hashedPassword: '1234',
      userResidentNumber: '23948239',
    };
  }
}
