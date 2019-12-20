import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { options } from 'joi';

@Injectable()
export class UserAppService {
  // public tempobject: mongoose.Schema;
  // constructor(options: mongoose.Schema) {
  //   this.tempobject = options;
  // }
  getHello(): string {
    return 'Hello World!';
  }
  // getSchema() {
  //   return this.tempobject;
  // }
}
