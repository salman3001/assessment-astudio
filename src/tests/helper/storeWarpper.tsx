import { ReactNode } from "react";
import { store } from "@src/store/store.ts";
import { Provider } from "react-redux";

export default function StoreWrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
