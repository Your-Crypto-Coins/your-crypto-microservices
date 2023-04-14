import { Module } from '@nestjs/common';
import { CryptoService } from '../../common/services/crypto.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CryptoService],
})
export class AuthModule {}
