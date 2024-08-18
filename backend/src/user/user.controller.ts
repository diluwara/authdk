import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { ResponseService } from '../common/utils/response.util';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService, // Inject ResponseService
  ) {}

  @Get(':email')
  async findOne(@Param('email') email: string, @Res() res: Response) {
    const userResponse = await this.userService.findByEmail(email);

    if (userResponse.success) {
      return res
        .status(HttpStatus.OK)
        .json(this.responseService.handleSuccess(userResponse.message, userResponse.data));
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(this.responseService.handleError(userResponse.message));
    }
  }
}