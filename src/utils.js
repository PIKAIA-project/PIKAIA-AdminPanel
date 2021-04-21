export const getIsLoggedIn = () => {
  if (getCookie("token").length > 2) {
    return true;
  }
  return false;
};

export const getToken = () => {
  let token = getCookie("token");
  return token;
};

export const getApiURL = () => {
  return "https://pikaia.azurewebsites.net/";
};

export const getCookie = (c_name) => {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
};

export const logOutUser = () => {
  // remove previously created cookie
  document.cookie =
    "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
