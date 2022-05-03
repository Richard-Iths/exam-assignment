<script context="module" lang="ts">
  export enum AppIcons {
    NAV_HOME = "ri-home-3-fill",
    NAV_CURRENCY = "ri-currency-fill",
    NAV_ORDERS = "ri-file-list-3-fill",
    NAV_USERS = "ri-user-fill",
    ASSIGN_USER = "ri-map-pin-user-fill",
    RELEASE_ORDER="ri-building-2-fill",
    CLOSE="ri-close-fill",
  }
  export enum AppIconSizes {
    NORMAL = "icon--normal",
    MEDIUM = "icon--medium",
    LARGE = "icon--large"
  }
  export interface Props {
    icon:AppIcons
    size:AppIconSizes
  }
</script>

<script lang="ts">
  export let icon : Props["icon"]
  export let size : Props["size"]
</script>

<i class={`${icon} ${size} icon`}
></i>

<style lang="scss">
  .icon {
    &--normal {
      font-size: 1.5em;
    }
    &--medium {
      font-size: 2em;
    }
    &--large {
      font-size: 3em; 
    }
  }
</style>