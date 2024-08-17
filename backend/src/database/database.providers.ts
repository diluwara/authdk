import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('databaseUri'),
    }),
  }),
];
