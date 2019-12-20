import { Controller, Get } from '@nestjs/common';
import { UserAppService } from './userapp.service';

@Controller('userapp')
export class UserAppController {
  constructor(private readonly appService: UserAppService) {}
  @Get()
  getoptions() {
    console.log('hello');
  }
}
