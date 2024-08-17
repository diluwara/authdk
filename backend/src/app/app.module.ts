import { Module } from '@nestjs/common';
import { CustomConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CustomConfigModule, // Import the configuration module
    DatabaseModule, // Import the database module
    AuthModule, // Import the auth module
    UserModule, // Import the user module
    CommonModule, // Import the common module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
