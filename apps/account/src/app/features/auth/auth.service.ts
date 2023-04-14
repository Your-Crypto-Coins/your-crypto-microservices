import { Injectable } from '@nestjs/common';
import { CryptoService } from '../../common/services/crypto.service';
import { AccountSignIn } from '@your-crypto/contracts';
import { AccountSignUp } from '@your-crypto/contracts';

@Injectable()
export class AuthService {
  constructor(private cryptoService: CryptoService) {}

  signUp(dto: AccountSignUp.Request): Promise<AccountSignUp.Response> {
    return;
  }

  signIn(dto: AccountSignIn.Request): Promise<AccountSignIn.Response> {
    return;
  }
}
