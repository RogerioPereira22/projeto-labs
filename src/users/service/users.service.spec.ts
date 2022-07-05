import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from 'src/root-mongo-test.module'; 
import { UsersService } from './Users.service'; 
import { Users, UsersSchema } from '../schemas/users.schema';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new User if not exist', async () => {
    const user = {
      name: 'test',
      email: 'test@examplo.com',
      phoneNumber: '+559876543210',
      password:'slfsfbalskbdfla',
    };
    const UsersDoc1 = await service.upsert(user);
    expect(UsersDoc1).toEqual(expect.objectContaining(user));

    const UsersDoc2 = await service.upsert(user);
    expect(UsersDoc2).toEqual(UsersDoc1);
  });
});
