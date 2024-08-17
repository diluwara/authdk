import * as CryptoJS from "crypto-js";

const secretKey = "123456ABCD";

interface DecryptedData {
  id: string;
  email: string;
  name: string;
}

export function decryptObject(encryptedText: string): DecryptedData | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decryptedData = JSON.parse(
      bytes.toString(CryptoJS.enc.Utf8)
    ) as DecryptedData;

    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return null; // Handle decryption errors
  }
}
