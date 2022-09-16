import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/type/context';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly usersService: UsersService, //
    private readonly authsService: AuthsService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('userEmail') userEmail: string, //
    @Args('userPassword') userPassword: string,
  ) {
    const user = await this.usersService.findOneByEmail({ userEmail });

    if (!user)
      throw new UnprocessableEntityException('가입된 이메일이 없습니다.');

    const isAuth = await bcrypt.compare(userPassword, user.userPassword);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');

    return this.authsService.getAccessToken({ user });
  }

  @Mutation(() => String)
  async logout(
    @Context() context: IContext, //
  ) {
    const accessToken = context.req.headers['authorization'].split(' ')[1];
    const refreshToken = context.req.headers['cookie'].split('=')[1];

    try {
      jwt.verify(accessToken, 'myAccessKey');
      jwt.verify(refreshToken, 'myRefreshKey');
    } catch {
      throw new UnauthorizedException();
    }

    await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
      ttl: 60,
    });
    await this.cacheManager.set(`refreshToken${refreshToken}`, 'refreshToken', {
      ttl: 60,
    });

    return '로그아웃 성공!';
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ) {
    return this.authsService.getAccessToken({ user: context.req.user });
  }
}
