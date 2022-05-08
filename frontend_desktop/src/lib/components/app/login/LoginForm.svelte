<script lang="ts">
import Form,{Props as IForm} from "@components/forms/Form.svelte"
import Popup,{Props as IPopup} from "@components/modal/Popup.svelte";
import {updateApp} from "@lib/stores/app"
import type { IJsonResponse } from "@src/lib/models";
import { AppState, TauriCommands } from "@src/types";
import { invoke } from "@tauri-apps/api/tauri";
const formData : {username:string,password:string} = {
  username:"",
  password:""
}
const onInputChangeHandler = (inputName : string,value? : string) => {
  formData[inputName] = value;
}

const formProps :IForm = {
  btnTitle:"login",
  handleSubmit:async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      const res = await invoke<IJsonResponse<AppState>>(TauriCommands.AUTHENTICATE_USER,{authUser:{...formData}})
        updateApp(res.data)
    } catch (err) {
      console.log(err,"err")
    }
  },
  inputs:[
    {
      name:"username",
      label:"username",
      onChangedHandler:onInputChangeHandler,
      type:"text",
      placeholder:"username"
    },
    {
      name:"password",
      label:"password",
      onChangedHandler:onInputChangeHandler,
      type:"password",
      placeholder:"password"
    }
  ]
}
const popupProps : IPopup = {
  onCloseHandler:() => {},
  title:"Login",
  clickBackdropClose:false,
  showCloseIcon:false,
}

</script>
<Popup {...popupProps}>
  <Form {...formProps}/>
</Popup>
