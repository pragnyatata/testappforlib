import { Controller, Get } from '@nestjs/common';
import { UserAppService } from './userapp.service';

@Controller('userapp')
export class UserAppController {
  constructor(private readonly appService: UserAppService) {}
  @Get()
  gethello() {
    console.log('hello');
  }
}
