import { defineStore } from "pinia";

export const AuthStore = defineStore("auth", {
  state() {
    return {
      user: null,
      encryptedToken: "",
      status: false,
      devToken: "",
    };
  },
  actions: {
    setData(user, token) {
      this.user = user;
      this.encryptedToken = this.crypt("hell", token);
      this.status = true;
      this.devToken = token;
    },
    crypt(salt, text) {
      const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
      const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
      const applySaltToChar = (code) =>
        textToChars(salt).reduce((a, b) => a ^ b, code);

      return text
        .split("")
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join("");
    },
    decrypt(salt, encoded) {
      const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
      const applySaltToChar = (code) =>
        textToChars(salt).reduce((a, b) => a ^ b, code);
      return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
    },
    token() {
      if (this.encryptedToken)
        return "Bearer " + this.decrypt("hell", this.encryptedToken);
    },
  },
  persist: {
    strategies: [
      {
        key: "user",
        storage: localStorage,
        paths: ["status", "encryptedToken", "user", "devToken"],
      },
    ],
    enabled: true,
  },
});
