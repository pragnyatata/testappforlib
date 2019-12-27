import { CreateUserDto } from './../users/dto/createUser.dto';
import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Model, PassportLocalModel } from 'mongoose';
import { IUser } from '../users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>,
  ) {}

  async register(user) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };
    const user2 = new this.userModel({ username: user.email });

    for (let k of Object.keys(user)) {
      if (k !== 'password' && k !== 'email')
        (user2 as any)[k] = (user as any)[k];
    }
    await this.userModel.register(
      user2,

      user.password,
      err => {
        if (err) {
          console.log(err);
          status = { success: false, message: err };
        }
      },
    );

    return status;
  }

  createToken(user) {
    console.log('get the expiration');
    const expiresIn = 3600;
    console.log('sign the token');
    console.log(user);

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
      },
      '12345678',
      { expiresIn },
    );
    console.log('return the token');
    console.log(accessToken);
    return {
      expiresIn,
      accessToken,
    };
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findById(payload.id);
  }
}
