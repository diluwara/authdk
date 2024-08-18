import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ThrottlerModule } from '@nestjs/throttler';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    // ThrottlerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     throttlers: [
    //       {
    //         ttl: parseInt(configService.get<string>('THROTTLE_TTL', '60'), 10),
    //         limit: parseInt(
    //           configService.get<string>('THROTTLE_LIMIT', '3'),
    //           10,
    //         ),
    //       },
    //     ],
    //   }),
    // }),
  ],
})
export class CustomConfigModule {}
