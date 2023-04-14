import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return one user without password', async () => {
    const result = {
      id: '55da7125-21ce-43d3-a014-89fde0e1adc2',
      nickname: 'Test',
      email: 'test@test.ru',
    };

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(result));

    expect(
      await controller.getOne('55da7125-21ce-43d3-a014-89fde0e1adc2')
    ).toBe(result);
  });
});
