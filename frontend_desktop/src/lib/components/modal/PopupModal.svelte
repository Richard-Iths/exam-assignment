<script context="module" lang="ts">
  export interface Props {
    onCloseHandler:() => void;
    title?:string; 
  }
</script>

<script lang="ts">
  import {scale} from "svelte/transition";
  import { draggable } from '@neodrag/svelte';
import Icon,{AppIcon, AppIconSize} from "../icons/Icon.svelte";
  export let onCloseHandler : Props["onCloseHandler"];
  export let title: Props["title"] = "";
</script>

<section class={`popup-modal popup-modal__draggable primary-color`}  
transition:scale={{duration:500}} use:draggable={{bounds:"body",cancel:".cancel" }}
>
<article class="popup-modal__wrapper">

  <div class="popup-modal__cta accent-color--dark">
    {#if title}
    <h4 class="font-heading--xs">{title}</h4>
    {/if}
    <button class="popup-modal__cta__btn accent-color--dark"  on:click={onCloseHandler}> 
      <Icon icon={AppIcon.CLOSE} size={AppIconSize.MEDIUM}/>
    </button>
  </div>
  <div class="popup-modal__inner primary-color cancel">
    <slot></slot>
  </div>
</article>
</section>
    
    <style lang="scss">
      .popup-modal {
        position: fixed;
        min-width: 70rem;
        box-shadow: 1px 2px 15px rgba(0, 0, 0,.3);
        padding-bottom: 3.2rem;
        z-index: 10000;
        overflow-y: auto;
        top:0;
        left:0;
        min-width: 100vw;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        &__cta {
          padding:1.6rem 3.2rem;
          min-width: 100%;
          display: flex;
          justify-content: space-between;
          position: relative;

          &__btn {
            border:none;
            transform: scale(1);
            outline: none;
      transition: all 200ms ease;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      transition: all 200ms ease;
      }
      &:active {
        transform: scale(1.2);
      }
          }
        }
        &__draggable {
          cursor: grab;
        }
        &__inner {
          display:grid;
          place-items: center;
          min-width: 100%;
        }
        &__wrapper {
          min-width: 100%;
        }
  }
</style>