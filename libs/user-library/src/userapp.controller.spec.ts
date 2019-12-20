import { Test, TestingModule } from '@nestjs/testing';
import { UserAppController } from './userapp.controller';
import { UserAppService } from './userapp.service';

describe('UserAppController', () => {
  let appController: UserAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserAppController],
      providers: [UserAppService],
    }).compile();

    appController = app.get<UserAppController>(UserAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
