<script context="module" lang="ts">
  export interface Props {
    onCloseHandler:() => void;
    title?:string; 
  }
</script>

<script lang="ts">
  import {scale} from "svelte/transition";
  import { draggable } from '@neodrag/svelte';
  export let onCloseHandler : Props["onCloseHandler"];
  export let title: Props["title"] = "";
</script>

<section class="modal primary-color--dark-modal" on:click={onCloseHandler}>
  <article class="modal__draggable" transition:scale={{duration:500}} use:draggable={{bounds:"parent",cancel:".cancel"}}>
    <div class="modal__cta accent-color">
      {#if title}
      <h4 class="font-heading--xs">{title}</h4>
      {/if}
    </div>
    <div class="modal__inner accent-color--dark cancel">
      <slot></slot>
    </div>
  </article>
</section>

<style lang="scss">
  .modal {
    position: fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;
    z-index: 999999;
    display: grid;
    place-content: center;
    &__cta {
      padding:1.6rem 3.2rem;
    }
    &__draggable {
      cursor: grab;
    }
  }
</style>