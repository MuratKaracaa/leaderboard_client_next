import { useCallback, useEffect } from "react";
import type { AppProps } from "next/app";

import { getFromStore } from "@/common/utils/localStorage";
import "@/common/localization";
import { setCookie } from "@/common/utils/cookie";

import GlobalStyles from "@/components/globalStyles";

import { getRequest } from "@/service/httpService";
import serviceUrls from "@/service/serviceUrls";

export default function App({ Component, pageProps }: AppProps) {
  let token = "";

  try {
    token = getFromStore<string>("AUTH_TOKEN");
  } catch (error) {}

  const handshake = useCallback(async () => {
    await getRequest(serviceUrls.USER.HANDSHAKE);
    setCookie("AUTH_TOKEN", token);
  }, []);

  useEffect(() => {
    if (token) {
      handshake();
    }
  }, [handshake]);

  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />;
    </>
  );
}
