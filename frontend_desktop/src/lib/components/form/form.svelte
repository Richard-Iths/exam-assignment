<script context="module" lang="ts">
  import type {Props as IInput} from './input.svelte';
   export type StylingClassess = "form-controller__row" 
  interface StylingProps {
    direction?: StylingClassess
  }
  export interface Props {
    inputs:IInput[]
    styling?:StylingProps
  }
</script>
<script lang="ts">
import Input from "./input.svelte";
  export let inputs : Props["inputs"];
  export let styling : Props["styling"] = {}
</script>

<article class={`form-controller ${styling.direction}`}>
  {#each inputs as input }
    <Input {...input}/>
  {/each}
</article>

<style lang="scss">
  .form-controller {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-transform: capitalize;
    &__column {
      flex-direction: column;
      gap:2rem;
    }
    &__row {
      flex-direction: row;
      gap:2rem;
      flex-wrap: wrap;
    }
  }
</style>