import { Module, Global } from '@nestjs/common';
import { ResponseService } from './utils/response.util';

@Global()
@Module({
  providers: [ResponseService],
  exports: [ResponseService],
})
export class CommonModule {}
