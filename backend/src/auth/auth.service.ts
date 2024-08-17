import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ResponseService } from '../common/utils/response.util';
import { CryptoService } from '../common/utils/crypto.service'; // Import CryptoService

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private responseService: ResponseService,
    private cryptoService: CryptoService, // Inject CryptoService
  ) {}

  private modifyUserData(data: any): any {
    return {
      id: data._id,
      email: data.email,
      name: data.name,
    };
  }

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<{ success: boolean; message: string; accessToken?: string }> {
    try {
      const createUserResponse =
        await this.userService.createUser(createUserDto);
      if (!createUserResponse.success) {
        return this.responseService.handleError(createUserResponse.message);
      }

      const modifiedData = this.modifyUserData(createUserResponse.data);

      // Encrypt the access token before returning
      const encryptedAccessToken = this.cryptoService.encryptObject(
        modifiedData
      );

      return this.responseService.handleSuccess(
        'Account created successfully',
        encryptedAccessToken,
      );
    } catch (error) {
      console.log(error);
      return this.responseService.handleError(
        'An error occurred during signup',
      );
    }
  }

  async signIn(
    loginUserDto: LoginUserDto,
  ): Promise<{ success: boolean; message: string; accessToken?: string }> {
    const { email, password } = loginUserDto;

    const validateUserResponse = await this.userService.validateUser(
      email,
      password,
    );

    if (!validateUserResponse.success) {
      return this.responseService.handleError(validateUserResponse.message);
    }

    const modifiedData = this.modifyUserData(validateUserResponse.data);

    // Encrypt the access token before returning
    const encryptedAccessToken = this.cryptoService.encryptObject(
     modifiedData
    );

    return this.responseService.handleSuccess(
      'Sign-in successful',
      encryptedAccessToken,
    );
  }
}
