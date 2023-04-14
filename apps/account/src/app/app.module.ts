import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions, RMQModule } from 'nestjs-rmq';
import * as Joi from 'joi';

const getRmqConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    exchangeName: configService.get('AMQP_EXCHANGE', ''),
    connections: [
      {
        login: configService.get('AMQP_USER'),
        password: configService.get('AMQP_PASSWORD'),
        host: configService.get('AMQP_HOST'),
      },
    ],
    queueName: configService.get('AMQP_QUEUE'),
    serviceName: 'account',
  }),
});
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.account.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev', 'prod', 'local')
          .default('local')
          .required(),
        AMQP_EXCHANGE: Joi.string().required(),
        AMQP_PASSWORD: Joi.string().required(),
        AMQP_HOST: Joi.string().hostname().required(),
        AMQP_QUEUE: Joi.string().required(),
      }),
    }),
    RMQModule.forRootAsync(getRmqConfig()),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
