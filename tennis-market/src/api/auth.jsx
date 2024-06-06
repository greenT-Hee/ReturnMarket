import Cookies from "universal-cookie";
import { normalAxios } from "../axios";

const cookies = new Cookies();

export function setAccessTokenToCookie(accessToken) {
  cookies.set("accessToken", accessToken, {
    path: "/",
    secure: true,
  });
}

export const getCookie = (name) => {
  return cookies.get(name);
};


export const logout = async () => {
  const cookies = new Cookies();
  try {
    const response = await normalAxios.post(`/accounts/logout/`);
    // window.localStorage.setItem('logout', Date.now());
    if (response.status === 200) {
      localStorage.removeItem("recoil-persist");
      cookies.remove('accessToken');
      normalAxios.defaults.headers.common["Authorization"] = null;
      window.location.href = '/';
    }
  } catch (err) {
    window.localStorage.removeItem("recoil-persist");
    cookies.remove('accessToken');
    normalAxios.defaults.headers.common["Authorization"] = null;
    window.location.href = '/';
    console.error(err);
  }
};