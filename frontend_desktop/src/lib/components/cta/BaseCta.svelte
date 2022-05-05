<script context="module" lang="ts">
  import type {Props as IIcon} from "@components/icons/Icon.svelte";
  export interface Props {
    icon:IIcon,
    onClickHandler: (e: Event) => void
    title:string,
  }
</script>

<script lang="ts">
  import Icon from "@components/icons/Icon.svelte"
  export let ctas : Props[];
</script>
<div class="cta primary-color">
  {#each ctas as cta}
  <button class="cta__btn" on:click={cta.onClickHandler}>
    <Icon {...cta.icon}/>
    <span class="font-text--r cta__btn__title">{cta.title}</span>
  </button>
  {/each}
</div>
<style lang="scss">
  .cta {
    display: flex;
    flex-wrap: wrap;
    padding:0 3.2rem;
    gap:2rem;
    &__btn {
      display: flex;
      align-items: center;
      padding:1rem 2rem;
      border:none;
      background-color: transparent;
      cursor: pointer;
      &__title {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>