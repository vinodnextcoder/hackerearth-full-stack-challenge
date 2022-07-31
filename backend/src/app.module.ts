import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
import { MatchesModule } from './matches/matches.module';
import { CommentsModule } from './comments/comments.module';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE || 'dev'}`],
      validationSchema: configValidationSchema,
    }),
    

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: 'mongodb://localhost',
        port:27017,
        database: 'test',
        entities: ['dist/src/**/**/entities/*.entity.js'],
        useUnifiedTopology: true,
        useNewUrlParser: true,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    MatchesModule,
    CommentsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
