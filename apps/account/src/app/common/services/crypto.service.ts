import * as crypto from 'node:crypto';

const SCRYPT_PARAMS = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const SCRYPT_PREFIX = '$scrypt$N=32768,r=8,p=1,maxmem=67108864$';

const SALT_LEN = 32;
const KEY_LEN = 64;

export class CryptoService {
  hashPassword(password: SomeString) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(SALT_LEN, (err, salt) => {
        if (err) {
          reject(err);
          return;
        }
        crypto.scrypt(password, salt, KEY_LEN, SCRYPT_PARAMS, (err, hash) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(this.serializeHash(hash, salt));
        });
      });
    });
  }

  serializeHash(hash: Buffer, salt: Buffer) {
    const saltString = salt.toString('base64').split('=')[0];
    const hashString = hash.toString('base64').split('=')[0];
    return `${SCRYPT_PREFIX}${saltString}$${hashString}`;
  }

  deserializeHash(phcString: string) {
    const parsed = phcString.split('$');
    parsed.shift();
    if (parsed[0] !== 'scrypt') {
      throw new Error('Node.js crypto module only supports scrypt');
    }
    const params = Object.fromEntries(
      parsed[1].split(',').map((p) => {
        const kv = p.split('=');
        const map = new Map().set(kv[1], Number(kv[1]));
        return [map];
      })
    );
    const salt = Buffer.from(parsed[2], 'base64');
    const hash = Buffer.from(parsed[3], 'base64');
    return { params, salt, hash };
  }
}
