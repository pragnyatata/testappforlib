import { options } from 'joi';
import { UserSchema } from './users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, DynamicModule } from '@nestjs/common';
import { UserAppController } from './userapp.controller';
import { UserAppService } from './userapp.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as passportLocalMongoose from 'passport-local-mongoose';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  controllers: [UserAppController],
  providers: [UserAppService],
})
export class UserAppModule {
  static registerSchema(options): DynamicModule {
    //console.log(options);
    //UserSchema.add(options.obj);
    Object.keys(options).forEach(function(key) {
      var value = options[key];
    });
    UserSchema.plugin(passportLocalMongoose);
    //console.log(UserSchema);
    return {
      module: UserAppModule,
      imports: [
        UsersModule,
        AuthModule,
        MongooseModule.forRoot('mongodb://localhost/nest'),
      ],
      controllers: [UserAppController],
      providers: [UserAppService],
    };
  }
}
