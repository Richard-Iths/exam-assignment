<script context="module" lang="ts">
  import type { Props as IBaseModal } from "@components/modal/BaseModal.svelte";
  import type { Props as IForm } from "@components/form/form.svelte";
  import type { Props as IBtn } from "@components/buttons/ActionButton.svelte";
  import { AppConfig, TauriCommands } from "@src/types";
  import type { JsonApiSuccessResponse } from "@lib/models";
</script>

<script lang="ts">
  import ActionButton from "@components/buttons/ActionButton.svelte";
  import Form from "@components/form/form.svelte";
  import BaseModal from "@components/modal/BaseModal.svelte";
  import {updateApp} from '@lib/stores/app'
  import { invoke } from "@tauri-apps/api/tauri";

  const newConfig: AppConfig = {
    host: {
      address: "http://localhost",
      port: 7001,
    },
  };
  const onChangeHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const key = target.name;

    if (value) {
      newConfig.host[key] = value;
    }
  };
  const proxyConfigForm: IForm["inputs"] = [
    {
      inputLabel: "Proxy Address",
      name: "proxy-address",
      value: "",
      placeHolder: "http://localhost",
      onChangeHandler,
    },
    {
      inputLabel: "Port",
      name: "port",
      value: "",
      placeHolder: "7001",
      onChangeHandler,
    },
  ];
  const baseModalState: IBaseModal = {
    onCloseHandler: () => {},
    title: "Configure application settings",
  };
  const actionBtnState: IBtn = {
    onClickHandler: async () => {
      console.log("here");
      try {
        const res = await invoke<JsonApiSuccessResponse>(
          TauriCommands.ADD_APPLICATION_CONFIG,
          { newConfig }
        );
        console.log(res,"res");
        if (res.data[0].attributes.message === "success") {
          updateApp("initialized")
        }
      } catch (err) {
        console.log(err);
      }
    },
    title: "Apply",
  };
</script>

<BaseModal {...baseModalState}>
  <section class="app-config">
    <Form inputs={[...proxyConfigForm]} />
    <ActionButton {...actionBtnState} />
  </section>
</BaseModal>

<style lang="scss">
  .app-config {
    padding: 1.6rem 3.2rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    min-width: 32rem;
  }
</style>
