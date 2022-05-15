<script context="module" lang="ts">
 
  export enum ModalTransition {
    TRANSITION_SLIDE,
    TRANSITION_FADE,
  }
  type TransitionDirection = "right" | "left" |"up" | "down"
  interface Transition {
    direction?: TransitionDirection
    delay?:number 
  }
  export interface Props {
    title:string;
    transition:Transition
  }
</script>

<script lang="ts">
  import {navigate} from 'svelte-navigator'
import {fly, FlyParams} from 'svelte/transition'
import Icon ,{IconName,IconSize,Props as IIcon} from "@components/ui/icons/Icon.svelte"
import { KeyboardShortCut } from '@src/types';
  export let title : Props["title"]
  export let transition : Props["transition"] = {delay:0,direction:"left"}
  const iconProps : IIcon = {
    iconName:IconName.BACK_ICON,
    iconSize:IconSize.EXTRA_LARGE,
  }
  const onCloseHandler =(e: Event) => {
    if(e instanceof KeyboardEvent &&  e.code === KeyboardShortCut.ESCAPE || e instanceof MouseEvent) {
      navigate(-1)
    }
  }
  const getTransitionDirection = () : FlyParams => {
    const {delay,direction} =  transition;
    const transitionObj : FlyParams = {delay,duration:500, opacity:1}
    switch(direction) {
      case "left" : 
        transitionObj.x = 10000
        break;
      case "right":
        transitionObj.x = -10000
        break
        case "up":
        transitionObj.y = 10000
        break
        case "down":
        transitionObj.y = -10000
        break
    }
    return {...transitionObj}
  }
</script>
<svelte:window on:keyup={onCloseHandler} />
<section class="modal primary-color" transition:fly={getTransitionDirection()}>
<div class={`modal__header primary-color ${transition.direction === "left" &&'modal__header--reverse'}`}>
  <button class={`modal__header__btn ${transition.direction === "left" && 'modal__header__btn--flip'}`} on:click={onCloseHandler}>
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

      &--reverse {
        flex-direction: row-reverse;
      }
      &__btn {
        background: transparent;
        border:none;
        &--flip {
          transform: rotate(180deg)
        }
    }
    }

  }
</style>