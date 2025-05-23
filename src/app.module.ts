import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event/entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '00874805',
      database: 'events',
      autoLoadEntities: true,
      entities: [Event],
      synchronize: true,
    }),
    EventModule,
    AuthModule,
    AdminModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
