import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { successMessage, errorMessage } from '../../utils'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    try {
      const { email, password, name, mobileNo ,permisions,roles} = authCredentialsDto;
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      const user = await this.create({ email, password: newPassword, name, mobileNo, permisions,roles });
      const res = await this.save(user);
      return successMessage('Record created successfully', null);

    } catch (err) {
      if (err.code == 11000) {
        return errorMessage('Username already exists', null);
      }
      return errorMessage('Internal server error ', null);

    }
  }
}

