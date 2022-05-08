
<script context="module" lang="ts">
  type FormEvent = Event & {
    currentTarget: EventTarget & HTMLFormElement;
}
  export interface Props {
    handleSubmit:(e : FormEvent) => void 
    btnTitle:string
    inputs:IInput[]
  }
</script>
<script lang="ts">
  import Input,{Props as IInput} from "@components/forms/Input.svelte"
  export let handleSubmit : Props["handleSubmit"]
  export let btnTitle : Props["btnTitle"]
  export let inputs: Props["inputs"]
</script>
  

<form class="form-controller" on:submit={handleSubmit}>
  {#each inputs as input  }
    <Input {...input}/>
  {/each}
<button class="form-controller__submit accent-color font-heading--xxs">{btnTitle}</button>
</form>

<style lang="scss">
  .form-controller {
    display: flex;
    flex-direction: column;
    padding:1.6rem 3.2rem;
    gap:2rem;
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
    }
  }
</style>