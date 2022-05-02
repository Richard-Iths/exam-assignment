import { writable } from "svelte/store";
import type { AppState } from "@src/types";

interface Store {
  state: AppState;
}

const appStore = writable<Store>({ state: "pending" });

export const updateApp = (state: AppState) =>
  appStore.update(() => ({ state }));

export default appStore;
