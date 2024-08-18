import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  imports: [
    ...databaseProviders, // Spread the database providers here
  ],
  exports: [
    ...databaseProviders, // Export the providers so other modules can use them
  ],
})
export class DatabaseModule {}
