import { Cookies as ReactCookies } from "react-cookie";

class Cookies {
  static instanceOf = new ReactCookies();

  static set(key, value) {
    Cookies.instanceOf.set(key, value);
  }

  static get(key) {
    return Cookies.instanceOf.get(key);
  }

  static getAll() {
    return Cookies.instanceOf.getAll();
  }

  static remove(key) {
    return Cookies.instanceOf.remove(key);
  }

  static refurbishIfExists = (key, value) => {
    const cookies = Cookies.get(key);
    if (cookies) {
      Cookies.remove(key);
    }
    Cookies.set(key, value);
  }
}

class CollectiveCookies {
  static setAll = (cookies) => {
    cookies.forEach((element) => {
      Cookies.refurbishIfExists(element["key"], element["value"]);
    });
  }

  static removeAll = () => {
    const cookies = Cookies.getAll();
    for (let key in cookies) {
      Cookies.remove(key);
    }
  }
}

const CookiesHelper = {
  Cookies,
  CollectiveCookies,
};

export default CookiesHelper;
