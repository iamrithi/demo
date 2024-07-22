// "use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Axios } from "./axios";

const useAxiosAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestInterceptor = Axios.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.user.token}`;
        console.log(session?.user.token);
      }
      return config;
    });

    return () => {
      Axios.interceptors.request.eject(requestInterceptor);
    };
  }, [session]);

  return Axios;
};

export default useAxiosAuth;
