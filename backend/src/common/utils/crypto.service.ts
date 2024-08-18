import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CryptoService {
  private secretKey = '123456ABCD';

  encryptObject(object: object): string {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(object),
      this.secretKey,
    ).toString();

    return ciphertext;
  }
}
