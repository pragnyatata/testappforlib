import { authUserSchema } from './joi/authSchema.joi';
import {
  Controller,
  HttpStatus,
  Response,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'joi';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  public async register(@Response() res, @Body() createUserDto) {
    const user = await this.usersService.findOne({
      username: createUserDto.email,
    });
    if (user) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'User already registered' });
    } else {
      const userjoi = {
        email: createUserDto.email,
        password: createUserDto.password,
      };
      const result2 = validate(userjoi, authUserSchema);
      if (result2.error) {
        const errorMessage = result2.error.details.shift().message;
        const message: string = errorMessage.replace(/["]/g, '');
        return res.status(HttpStatus.BAD_REQUEST).json(message);
      }
      const result = await this.authService.register(createUserDto);
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      return res.status(HttpStatus.OK).json(result);
    }
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Response() res, @Body() login: LoginUserDto) {
    return await this.usersService
      .findOne({ username: login.email })
      .then(user => {
        if (!user) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'User Not Found',
          });
        } else {
          console.log('start getting the token');
          const token = this.authService.createToken(user);
          console.log(token);
          return res.status(HttpStatus.OK).json(token);
        }
      });
  }
}
