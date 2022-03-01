import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserBodyDto } from './dto/create-user-body.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async findById(uuid: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne(uuid);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  async create(createUserBodyDto: CreateUserBodyDto): Promise<User> {
    const newUser = await this.userRepository.createUser(createUserBodyDto);

    return newUser;
  }
}
