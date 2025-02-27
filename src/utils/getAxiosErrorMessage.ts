import { AxiosError } from "axios";

export default function getAxiosErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response) {
      return error.response.data?.message || "Response Error";
    }
    if (error.request) {
      return error.request || "Request Error";
    }

    return "Something went wrong";
  }
  return "Something went wrong";
}
