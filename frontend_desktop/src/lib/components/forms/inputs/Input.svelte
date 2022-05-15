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
    selectListOptions?:string[] | number[] | boolean[]
    disabled?:boolean
  }
</script>

<script lang="ts">
  import Icon,{IconName, IconSize, Props as IICon} from "@components/ui/icons/Icon.svelte";
  import {fade} from 'svelte/transition'
  export let name : Props["name"]
  export let type : Props["type"]
  export let label : Props["label"] = ""
  export let placeholder : Props["placeholder"] = ""
  export let value: Props["value"] = ""
  export let onChangedHandler : Props["onChangedHandler"]
  export let selectListOptions : Props["selectListOptions"] = []
  export let disabled : Props["disabled"] = false
  let selectInputValue = value
  let showSelectList = false
  const toggleSelectList = () => showSelectList = !showSelectList
  const toggleListIconProps : IICon = {
    iconName:IconName.ARROW_DOWN_ICON,
    iconSize:IconSize.LARGE
  }
  const handleSelectInput = (e : MouseEvent & {
    currentTarget: EventTarget & HTMLLIElement;
}) => {
    selectInputValue = e.currentTarget.innerText
    toggleSelectList()
  }
</script>

<div class="input-controller">
  {#if label}
    <label for={name} class="input-controller__label font-heading--xxs">{label}</label>
  {/if}
  <input class="input-controller__input font-text--r" type={type} name={name} placeholder={placeholder} value={selectInputValue} on:input={(e) => onChangedHandler(name,e.currentTarget.value)} disabled={disabled}/>
  {#if selectListOptions.length}
  <button on:click={toggleSelectList} class="input-controller__select-list__btn">
    <Icon {...toggleListIconProps}/>
  </button>
  {/if}
  {#if selectListOptions.length && showSelectList}
    <div class="input-controller__select-list__backdrop" on:click={toggleSelectList}></div>
    <div class="input-controller__select-list primary-color" transition:fade={{duration:200}}>
      <ul class="input-controller__select-list__list">
        {#each selectListOptions as option }
          <li class="input-controller__select-list__item hover--dark" on:click={handleSelectInput}>{option}</li>
        {/each}
      </ul>
    </div>  
  {/if}
</div>

<style lang="scss">
  .input-controller {
    display: flex;
    flex-direction: column;
    gap:1rem;
    position: relative;
    &__label {
      text-transform: capitalize;
    }
    &__input {
      padding:1.2rem;
      min-width: 32rem;
      border:none;
      border-radius: 6px;
      min-height: 5rem;
      max-height: 5rem;
      &:disabled {
        background-color: #cecbcb;
      }
    }
    &__select-list {
      position: absolute;
      min-width: 32rem;
      bottom: 0;
      transform: translate(0,105%);
      z-index: 2;
      &__backdrop {
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        border:2px solid red;
      }
      &__btn {
        position: absolute;
        background-color: transparent;
        border:none;
        right:0;
        transform: translate(-20%,165%);
      }
      &__list {
        list-style-type: none;
        padding:0;
        box-shadow: 2px 0 15px rgba($color: #000000, $alpha: 0.15);
      }
      &__item {
        padding:1.2rem 2rem;
        cursor: pointer;
      }
    }
  }
</style>