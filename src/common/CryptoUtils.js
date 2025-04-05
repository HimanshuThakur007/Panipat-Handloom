/* eslint-disable react/prop-types */
import CryptoJS from 'crypto-js';

export const encryptCBC = (plaintext, key, iv) => {
  return CryptoJS.AES.encrypt(plaintext, key, { iv: iv, mode: CryptoJS.mode.CBC }).toString();
};

export const decryptCBC = (ciphertext, key, iv) => {
  const decrypted = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv, mode: CryptoJS.mode.CBC });
  return decrypted.toString(CryptoJS.enc.Utf8);
};