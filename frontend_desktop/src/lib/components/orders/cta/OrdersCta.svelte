<script context="module" lang="ts">
  import {AppIconSizes,AppIcons} from "@components/icons/Icon.svelte"
</script>
<script lang="ts">
import BaseCta,{Props as IBaseCta} from "@components/cta/BaseCta.svelte"
  const ctaState: IBaseCta[] = [
    {
      icon:{
        icon:AppIcons.CLOSE,
        size:AppIconSizes.MEDIUM
      },
      onClickHandler:(_) => {
        console.log("clicked")
      },
      title:"New Order"
    },
    {
      icon:{
        icon:AppIcons.CLOSE,
        size:AppIconSizes.MEDIUM
      },
      onClickHandler:(_) => {
        console.log("clicked")
      },
      title:"Remove Order"
    },
  ]  
</script>

<article class="orders-cta">
  <BaseCta ctas={[...ctaState]}/>
</article>