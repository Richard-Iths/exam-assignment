
<script context="module" lang="ts">
  type FormEvent = Event & {
    currentTarget: EventTarget & HTMLFormElement;
}
type FlexDirection = "row" | "column"
  export interface Props {
    handleSubmit:(e : FormEvent) => void 
    btnTitle:string
    inputs:IInput[]
    flexDirection?: FlexDirection
  }
</script>
<script lang="ts">
  import Input,{Props as IInput} from "@src/lib/components/forms/inputs/Input.svelte"
  export let handleSubmit : Props["handleSubmit"]
  export let btnTitle : Props["btnTitle"]
  export let inputs: Props["inputs"]
  export let flexDirection: Props["flexDirection"] = "column"
</script>
  

<form class={`form-controller form-controller--${flexDirection}`} on:submit={handleSubmit}>
  {#each inputs as input  }
    <Input {...input}/>
  {/each}
<button class={`form-controller__submit form-controller__submit--${flexDirection} accent-color font-heading--xxs`}>{btnTitle}</button>
</form>

<style lang="scss">
  .form-controller {
    display: flex;
    padding:1.6rem 3.2rem;
    gap:2rem;
    &--row {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    }
    &--column {
    flex-direction: column;
    }
    &__submit {
      padding:1.6rem 3.2rem;
      text-align: center;
      border:none;
      text-transform: capitalize;
      transform: scale(1);
        transition: all ease 200ms;
      &:hover {
        transform: scale(1.1);
        transition: all ease 200ms;
      }
      &--row {
        max-height: 10rem;
      }
    }
  }
</style>