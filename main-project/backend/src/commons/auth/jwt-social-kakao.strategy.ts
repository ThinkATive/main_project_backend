import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      response_type: 'code',
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      userName: profile.username,
      userPhone: '010-1122-3344',
      userEmail: profile._json.kakao_account.email,
      userAddress: '어딘가',
      userGender: '여',
      hashedPassword: '1234',
      userResidentNumber: '23948239',
    };
  }
}
