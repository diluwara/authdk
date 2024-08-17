import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { UserService } from '../../src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { User } from '../../src/user/schemas/user.schema';
import { ResponseService } from '../../src/common/utils/response.util'; // Import ResponseService

export function createMockUser(overrides?: Partial<User>): User {
  return {
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedPassword123',
    type: 'user',
    resetPasswordExpires: '',
    resetPasswordToken: '',
    ...overrides,
  } as User;
}

describe('AuthService - signUp', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let responseService: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        ResponseService, // Add ResponseService to the providers array
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    responseService = module.get<ResponseService>(ResponseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return error if user already exists', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
      type: 'user',
    };

    jest.spyOn(userService, 'findByEmail').mockResolvedValue({
      success: true,
      message: 'User found',
      data: createMockUser(),
    });

    const result = await authService.signUp(createUserDto);

    expect(result).toEqual({
      success: false,
      message: 'User with this email already exists',
    });
  });

  it('should return success if user is created successfully', async () => {
    const createUserDto: CreateUserDto = {
      email: 'newuser@example.com',
      name: 'New User',
      password: 'password123',
      type: 'user',
    };

    jest.spyOn(userService, 'findByEmail').mockResolvedValue({
      success: false,
      message: 'User not found',
    });

    jest.spyOn(userService, 'createUser').mockResolvedValue({
      success: true,
      message: 'User created successfully',
      data: createMockUser({ email: createUserDto.email }),
    });

    jest.spyOn(jwtService, 'sign').mockReturnValue('test-access-token');

    const result = await authService.signUp(createUserDto);

    expect(result).toEqual({
      success: true,
      message: 'Account created successfully',
      data: 'test-access-token',
    });
  });

  it('should return error if user creation fails', async () => {
    const createUserDto: CreateUserDto = {
      email: 'newuser@example.com',
      name: 'New User',
      password: 'password123',
      type: 'user',
    };

    jest.spyOn(userService, 'findByEmail').mockResolvedValue({
      success: false,
      message: 'User not found',
    });

    jest.spyOn(userService, 'createUser').mockResolvedValue({
      success: false,
      message: 'Failed to create user',
    });

    const result = await authService.signUp(createUserDto);

    expect(result).toEqual({
      success: false,
      message: 'Failed to create user',
    });
  });

  it('should handle exceptions and return an error message', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
      type: 'user',
    };

    jest.spyOn(userService, 'createUser').mockRejectedValue(new Error('Some error'));

    const result = await authService.signUp(createUserDto);

    expect(result).toEqual({
      success: false,
      message: 'An error occurred during signup',
    });
  });
});

