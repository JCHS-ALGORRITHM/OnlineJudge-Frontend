import Cookies from 'js-cookie';

export default {
  setCookie: (name, value, options) => {
    return Cookies.set(name, value, options);
  },

  hasCookie: (name) => {
    return !!Cookies.get(name);
  },

  getCookie: (name) => {
    return Cookies.get(name);
  },

  removeCookie: (name) => {
    Cookies.remove(name);
  },
};
