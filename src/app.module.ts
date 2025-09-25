import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event/entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { OrganisationModule } from './organisation/organisation.module';
import { UsersModule } from './users/users.module';
import { MediaModule } from './media/media.module';
import { User } from './users/entities/user.entity';
import { Organisation } from './organisation/entities/organisation.entity';
import { Media } from './media/entities/media.entity';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'events',
      autoLoadEntities: true,
      entities: [Event, User, Media, Organisation],
      synchronize: true,
    }),
    EventModule,
    AuthModule,
    AdminModule,
    OrganisationModule,
    UsersModule,
    MediaModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
