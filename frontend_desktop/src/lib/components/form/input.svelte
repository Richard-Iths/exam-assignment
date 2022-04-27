<script context="module" lang="ts">
  export interface Props {
    name: string;
    inputLabel:string;
    placeHolder? : string;
    value:string;
    onChangeHandler:(e : Event) => void
  }
</script>
<script lang="ts">
  export let name : Props["name"];
  export let inputLabel : Props["inputLabel"];
  export let placeHolder : Props["placeHolder"] = undefined;
  export let value : Props["value"] ="";
  export let onChangeHandler : Props["onChangeHandler"]
</script>

<div class="input">
  {#if inputLabel}
     <label for={name} class="font-heading--xxs">{inputLabel}</label>
  {/if}
  <input name={name} class="accent-color"  placeholder={placeHolder ? placeHolder : ""} bind:value={value} onchange={onChangeHandler}/> 
</div>

<style lang="scss">
  .input {
    display: flex;
    gap:1rem;
    flex-direction: column;
    max-width: 32rem;
    min-width: 32rem;
    input {
      padding:1.6rem 3.2rem;
      border:none;
      outline: none;
      border-radius:6px;
    }

  }
</style>