import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOneById({ userId }) {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  findOneByEmail({ userEmail }) {
    return this.userRepository.findOne({
      where: { userEmail },
    });
  }

  findAllWithDeleted() {
    return this.userRepository.find({
      withDeleted: true,
    });
  }

  async create({
    userName,
    userPhone,
    userEmail,
    userAddress,
    userGender,
    hashedPassword: userPassword,
    userResidentNumber,
  }) {
    const user = await this.userRepository.findOne({ where: { userEmail } });

    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    //throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT); //이것도 가능

    return this.userRepository.save({
      userName,
      userPhone,
      userEmail,
      userAddress,
      userGender,
      userPassword,
      userResidentNumber,
    });
  }

  async checkUser({ userId }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new UnprocessableEntityException('없는 사용자 입니다.');
  }

  async update({ userId, updateUserInput }) {
    const currentUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    return this.userRepository.save({
      ...currentUser,
      id: userId,
      ...updateUserInput,
    });
  }

  async delete({ userId }) {
    const result = await this.userRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }

  async restore({ userId }) {
    const isRestored = await this.userRepository.restore({ id: userId });
    return isRestored.affected ? true : false;
  }
}
