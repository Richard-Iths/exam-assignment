<script context="module" lang="ts">
  import {AppIconSize,AppIcon} from "@components/icons/Icon.svelte"
  export interface Props {
    handleNewOrderPopup:() => void
  }
</script>
<script lang="ts">
import BaseCta,{Props as IBaseCta} from "@components/cta/BaseCta.svelte"
  export let handleNewOrderPopup : Props["handleNewOrderPopup"]
  const ctaState: IBaseCta[] = [
    {
      icon:{
        icon:AppIcon.UTILS_ADD,
        size:AppIconSize.MEDIUM
      },
      onClickHandler:(_) => {
        handleNewOrderPopup()
      },
      title:"New Order"
    },
    {
      icon:{
        icon:AppIcon.CLOSE,
        size:AppIconSize.MEDIUM
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