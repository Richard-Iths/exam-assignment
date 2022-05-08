<script context="module" lang="ts">
 
  export enum ModalTransition {
    TRANSITION_SLIDE,
    TRANSITION_FADE,
  }
  export interface Props {
    title:string;
  }
</script>

<script lang="ts">
  import {navigate} from 'svelte-navigator'
import {fly} from 'svelte/transition'
import Icon ,{IconName,IconSize,Props as IIcon} from "@components/ui/icons/Icon.svelte"
import { KeyboardShortCut } from '@src/types';
  export let title : Props["title"]

  const iconProps : IIcon = {
    iconName:IconName.BACK_ICON,
    iconSize:IconSize.EXTRA_LARGE
  }
  const onCloseHandler =(e: Event) => {
    if(e instanceof KeyboardEvent &&  e.code === KeyboardShortCut.ESCAPE || e instanceof MouseEvent) {
      navigate(-1)
    }
  }
</script>
<svelte:window on:keyup={onCloseHandler} />
<section class="modal primary-color" transition:fly={{delay:0,duration:500,x:-1000}}>
<div class="modal__header primary-color">
  <button on:click={onCloseHandler}>
    <Icon {...iconProps} />
  </button>
    <h2 class="modal__header__title font-header--r">{title}</h2>
</div>
<slot name="main-content"></slot>
<slot name="footer"></slot>
</section>

<style lang="scss">
  .modal {
    position: fixed;
    right:0;
    left:0;
    top:0;
    bottom:0;
    display: grid;
    grid-template-rows: repeat(3,min-content);

    &__header {
      display: flex;
      align-items: center;
      gap:3rem;
      padding:1.6rem 3.2rem;
    }

  }
</style>