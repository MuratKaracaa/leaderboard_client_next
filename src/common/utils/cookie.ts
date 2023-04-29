import Cookie from "js-cookie";
import { GetServerSidePropsContext } from "next";

import cookieKeys, { CookieKeysType } from "../cookieKeys";

const expires = 1 * 1000 * 60 * 60 * 24;

export const setCookie = (key: CookieKeysType, value: string) => {
  Cookie.set(cookieKeys[key], value, { expires });
};

export const getCookieData = (
  key: CookieKeysType,
  context?: GetServerSidePropsContext
) => {
  if (!context) {
    return Cookie.get(cookieKeys[key]) ?? "";
  } else {
    return context.req.cookies[cookieKeys[key]] ?? "";
  }
};

export const removeCookie = (key: CookieKeysType) => {
  Cookie.remove(cookieKeys[key]);
};
