<script lang="ts">
  import { Link } from "svelte-navigator";
  import Icon,{Props as IIcon,IconSize,IconName} from "@components/ui/icons/Icon.svelte";
  interface INavLink {
    link:string,
    title:string
  }
  interface INav {
    icon:IIcon,
    nav:INavLink
  }
  const navLinks : INav[] = [{
    icon:{iconName:IconName.ORDERS_ICON,
    iconSize:IconSize.EXTRA_LARGE},
    nav:{
    link:"orders",
    title:"orders"
  }
  },
  {
    icon:{
      iconName:IconName.USER_ICON,
      iconSize:IconSize.EXTRA_LARGE,
    },
   nav:{ 
     link:"invoices",
     title:"invoices"
    }
  },
  {
    icon:{
      iconName:IconName.INVOICES_ICON,
      iconSize:IconSize.EXTRA_LARGE,
  },
   nav:{ 
     link:"users",
     title:"users"
    }
  }
]

// const onKeyboardShortcut = (e : KeyboardEvent) => {
//   console.log(e.code)
// }

</script>
<!-- <svelte:window on:keyup={onKeyboardShortcut} /> -->
<nav class="app-nav">
  {#each navLinks as {icon,nav} }
  <Link class="app-nav__link" to={nav.link}>
    <article app-nav__link>
      <Icon {...icon}/>
      <h4>{nav.title.toUpperCase()}</h4>
    </article>
  </Link>
  {/each}
</nav>

<style lang="scss">
  .app-nav {
    display: flex;
    align-items: center;
    gap:5rem;
  }
</style>