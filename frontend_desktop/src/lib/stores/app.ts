import { writable } from "svelte/store";
import type { AppStates } from "@src/types";

interface Store {
  state: AppStates;
}

const appStore = writable<Store>({ state: "pending" });

export const updateApp = (state: AppStates) =>
  appStore.update(() => ({ state }));

export default appStore;
