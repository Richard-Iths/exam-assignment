<script context="module" lang="ts">
  type InputType = "text" | "number" | "date" | "password"
  type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement}
  export interface Props {
    label?:string,
    name:string,
    type:InputType
    placeholder? : string
    value?: string
    onChangedHandler:(inputName : string, value : string) => void
  }
</script>

<script lang="ts">
  export let name : Props["name"]
  export let type : Props["type"]
  export let label : Props["label"] = ""
  export let placeholder : Props["placeholder"] = ""
  export let value: Props["value"] = ""
  export let onChangedHandler : Props["onChangedHandler"]
</script>

<div class="input-controller">
  {#if label}
    <label for={name} class="input-controller__label font-heading--xxs">{label}</label>
  {/if}
  <input class="input-controller__input font-text--r" type={type} name={name} placeholder={placeholder} value={value} on:input={(e) => onChangedHandler(name,e.currentTarget.value)}/>
</div>

<style lang="scss">
  .input-controller {
    display: flex;
    flex-direction: column;
    gap:1rem;
    &__label {
      text-transform: capitalize;
    }
    &__input {
      padding:1.2rem;
    }
  }
</style>