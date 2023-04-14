import { Controller } from '@nestjs/common';
import { AccountSignIn, AccountSignUp } from '@your-crypto/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @RMQValidate()
  @RMQRoute(AccountSignUp.topic)
  signUp(dto: AccountSignUp.Request): Promise<AccountSignUp.Response> {
    return this.authService.signUp(dto);
  }

  @RMQValidate()
  @RMQRoute(AccountSignIn.topic)
  sigIn(dto: AccountSignIn.Request): Promise<AccountSignIn.Response> {
    return this.authService.signIn(dto);
  }
}
