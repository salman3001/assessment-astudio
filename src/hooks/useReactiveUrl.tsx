import { useState } from "react";

export function useReactiveUrl(
  url: string,
  defaultParams?: Record<string, string | number>,
) {
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;

  if (defaultParams) {
    Object.entries(defaultParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value.toString());
      }
    });
  }

  const [reactiveUrl, setReactiveUrl] = useState(urlObject.toString());

  const updateParams = (newParams: Record<string, string | number>) => {
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value.toString());
      }
    });

    setReactiveUrl(urlObject.toString());
  };

  return {
    url: reactiveUrl,
    params: urlObject.searchParams,
    updateParams,
  };
}
