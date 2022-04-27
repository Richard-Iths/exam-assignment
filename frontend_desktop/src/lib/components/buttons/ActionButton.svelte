<script context="module" lang="ts">
  export interface Props {
    title:string;
    onClickHandler:() => void;
  }
</script>

<script lang="ts">
export let title : Props["title"] 
export let onClickHandler : Props["onClickHandler"]
</script>
<button on:click={onClickHandler} class="action-btn utility-color--info heading--xs font-heading--xs">{title}</button>
<style lang="scss">
.action-btn {
  padding:1.6rem 3.2rem;
  border:none;
  border-radius: .6rem;
  transition: all 500ms ease;
  &:hover {
    transform: scale(1.1);
    transition: 500ms all ease;
  }
}
</style>