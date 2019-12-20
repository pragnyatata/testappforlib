import { MongooseModule } from '@nestjs/mongoose';
import { UserAppModule } from './../../../libs/user-library/src/userapp.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as mongoose from 'mongoose';
@Module({
  imports: [
    UserAppModule.registerSchema({
      firstNameofadmin: 'string',
      lastNameofadmin: 'string',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
