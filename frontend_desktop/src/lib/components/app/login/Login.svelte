<script context="module" lang="ts">
  import type { Props as IBaseModal } from "@components/modal/BaseModal.svelte";
  import type { Props as IForm } from "@components/form/form.svelte";
  import type { Props as IBtn } from "@components/buttons/ActionButton.svelte";
  import { AppConfig, TauriCommands } from "@src/types";
  import type { IJsonResponse } from "@lib/models";
  import type {AppState} from '@src/types';
</script>

<script lang="ts">
  import ActionButton from "@components/buttons/ActionButton.svelte";
  import Form from "@components/form/form.svelte";
  import BaseModal from "@components/modal/BaseModal.svelte";
  import {updateApp} from '@lib/stores/app'
  import { invoke } from "@tauri-apps/api/tauri";

  const authUser: {username:string,password:string} = {
      username: "",
      password:"" ,
  };
  const onChangeHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const key = target.name;
    if (value) {
      authUser[key] = value;
    }
  };
  const loginForm: IForm["inputs"] = [
    {
      inputLabel: "Username",
      name: "username",
      value: "",
      placeHolder: "username",
      onChangeHandler,
    },
    {
      inputLabel: "password",
      name: "password",
      value: "",
      placeHolder: "password",
      onChangeHandler,
    },
  ];
  const baseModalState: IBaseModal = {
    onCloseHandler: () => {},
    title: "Login",
  };
  const actionBtnState: IBtn = {
    onClickHandler: async () => {
      console.log("here");
      try {
        console.log(authUser,"authUser")
        const res = await invoke<IJsonResponse<AppState>>(
          TauriCommands.AUTHENTICATE_USER,
          { authUser }
        );
        console.log(res,"res");
        if (res.data === "authorized") {
          updateApp("authorized")
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
    <Form inputs={[...loginForm]} />
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
