import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserRepository } from '../repositories/user.repository';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { SingInResponse } from '../responses/sign-in.response';
import { successMessage, errorMessage } from '../../utils'
import { bool } from '@hapi/joi';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
     return await this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<SingInResponse> {
    const { email, password } = authCredentialsDto;

    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new UnauthorizedException('Please check your credentials');
  }
  async getAllUsers(@Body() Body:Body): Promise<any> {
    try{
      let reqObj ={};
      if(Object.keys(Body).length ==0){
        console.log(reqObj);
      }
    let userList = await this.userRepository.find({});
    if (userList && userList.length>0){
      return successMessage('Records Fetched', userList);
    }
    return errorMessage('Record not found', []);
    }catch(error){
      return errorMessage('Internal server error ', null);
    }
  }
}
