<script context="module" lang="ts">
  import {AppIcons,AppIconSizes,Props as IIcon} from "@components/icons/Icon.svelte" 
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
      icon:AppIcons.NAV_HOME,
      size:AppIconSizes.MEDIUM
    },
    href:AppRoutes.HOME
  },
  {
    icon: {
      icon:AppIcons.NAV_ORDERS,
    size:AppIconSizes.MEDIUM},
    href:AppRoutes.ORDERS
  },
  {
    icon: {
      icon:AppIcons.NAV_CURRENCY,
      size:AppIconSizes.MEDIUM},
    href:AppRoutes.INVOICES
  },
  {
    icon: {
      icon:AppIcons.NAV_USERS,
      size:AppIconSizes.MEDIUM
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