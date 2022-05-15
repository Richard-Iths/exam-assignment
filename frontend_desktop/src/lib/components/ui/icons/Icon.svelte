<script context="module" lang="ts">
  export enum IconSize {
    SMALL="icon__s",
    NORMAL="icon__me",
    LARGE="icon__l",
    EXTRA_LARGE="icon__xl"
  }
  export enum IconName {
    USER_ICON="ri-user-fill",
    ORDERS_ICON="ri-file-list-fill",
    INVOICES_ICON="ri-hand-coin-fill",
    CLOSE_ICON="ri-close-fill",
    BACK_ICON="ri-arrow-left-circle-fill",
    ADD_ICON="ri-add-fill",
    ARROW_DOWN_ICON="ri-arrow-down-s-fill"
  }
  export interface Props {
    iconName:IconName
    iconSize:IconSize
  }
</script>
<script lang="ts">
  export let iconName : Props["iconName"]
  export let iconSize : Props["iconSize"]
</script>

<i class={`${iconName} icon ${iconSize}`} />

<style lang="scss">
  .icon {
    font-size: 1em;
    cursor: pointer;
    &__s {
      font-size: .8em;
    }
    &__l {
      font-size: 2em;
    }
    &__xl {
      font-size: 4em;
    }
  }
</style>