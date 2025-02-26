import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";

export const useAxios = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const instance = axios.create({
    //  add default config here
  });

  const exec = async <T>(opt: AxiosRequestConfig) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await instance<T>(opt);

      setLoading(false);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(error.response.data?.message || "Response error");
          //   handel other scenerios here
        }

        if (error.request) {
          setErrorMessage("Request error, Please check your network");
        }
      }

      setErrorMessage("Something went wrong");
      setLoading(false);
    }
  };

  return {
    exec,
    loading,
    errorMessage,
  };
};
