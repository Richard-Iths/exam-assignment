<script context="module" lang="ts">
  import {AppIcon,AppIconSize,Props as IIcon} from "@components/icons/Icon.svelte" 
  import {AppRoutes} from "@src/types"

  interface Nav {
    icon:IIcon,
    href:AppRoutes
  }
</script>


<script lang="ts">
import Icon from '@components/icons/Icon.svelte'
import { link } from "svelte-spa-router";
const navLinks : Nav[] = [
  {
    icon:{
      icon:AppIcon.NAV_HOME,
      size:AppIconSize.MEDIUM
    },
    href:AppRoutes.HOME
  },
  {
    icon: {
      icon:AppIcon.NAV_ORDERS,
    size:AppIconSize.MEDIUM},
    href:AppRoutes.ORDERS
  },
  {
    icon: {
      icon:AppIcon.NAV_CURRENCY,
      size:AppIconSize.MEDIUM},
    href:AppRoutes.INVOICES
  },
  {
    icon: {
      icon:AppIcon.NAV_USERS,
      size:AppIconSize.MEDIUM
      },
      href:AppRoutes.USERS
    }
  ]
</script>

<aside class="accent-color--dark nav-aside">
{#each navLinks as navLink}
  <a href={navLink.href} class="primary-font-color" use:link><Icon {...navLink.icon} /></a>
{/each}
</aside>
<style lang="scss">
.nav-aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:1.6rem 0;
  a {
    transition: all 500ms ease;
    text-decoration: none;
    &:hover {
      transform: scale(1.1);
      transition: all 500ms ease;
    }
  }
}
</style>