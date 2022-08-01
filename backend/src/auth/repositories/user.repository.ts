import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { DatabaseErrorCodes } from '../enums/database-error-codes.enum';
import { successMessage, errorMessage } from '../../utils'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    try {
    const { email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: newPassword });
      const res = await this.save(user);
      return successMessage('Record created successfully', null);

    } catch (err) {
      console.log('-----------',err.code)
      if (err.code == 11000) {
        return errorMessage('Username already exists',null);
      }
      return errorMessage('Internal server error ',null);

    }
  }
}