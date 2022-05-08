<script context="module" lang="ts">
 
  export enum ModalTransition {
    TRANSITION_SLIDE,
    TRANSITION_FADE,
  }
  export interface Props {
    title:string;
    clickBackdropClose?:boolean;
    onCloseHandler:() => void;
    showCloseIcon?: boolean;
  }
</script>

<script lang="ts">
import {fly} from 'svelte/transition'
import Icon ,{IconName,IconSize,Props as IIcon} from "@components/ui/icons/Icon.svelte"
  export let title : Props["title"]
  export let clickBackdropClose : Props["clickBackdropClose"] = true
  export let onCloseHandler : Props["onCloseHandler"]
  export let showCloseIcon : Props["showCloseIcon"] = true

  const iconProps : IIcon = {
    iconName:IconName.CLOSE_ICON,
    iconSize:IconSize.EXTRA_LARGE
  }
  const handleBackdropClose = () => {
    if(clickBackdropClose) {
      onCloseHandler()
    }
  }
</script>
<section class="popup" 
on:click={handleBackdropClose}
>
<div class="popup__wrapper" transition:fly={{delay:0,duration:500,y:1000}}>
  <div class="popup__header accent-color--dark">
    {#if showCloseIcon}
    <button on:click={onCloseHandler}>
      <Icon {...iconProps} />
    </button>
    {/if}
    <h2 class="popup__header__title font-header--r">{title}</h2>
  </div>
  <article class="popup__main-content primary-color">
    <slot></slot>
  </article>
</div>
</section>

<style lang="scss">
  .popup {
    position: fixed;
    right:0;
    left:0;
    top:0;
    bottom:0;
    display: grid;
    place-items: center;
    background-color: rgba($color: #000000, $alpha: .5);
    &__wrapper {
      box-shadow: 1px 0 15px 1px rgba($color: #fff, $alpha: .25);
    }
    &__header {
      display: flex;
      align-items: center;
      gap:3rem;
      padding:1.6rem 3.2rem;
    }
    &__main-content {
      min-width: 32rem;
    }
  }
</style>