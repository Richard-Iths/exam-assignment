
<script context="module" lang="ts">
  import { Order,OrderFormMapping } from "@src/types";
  enum IconIds  {
    ASSIGN_USER="assignUser",
    RELEASE_ORDER="releaseOrder"
  }
</script>
<script lang="ts">
  import PopupModal,{Props as IPopupModal} from "@components/modal/PopupModal.svelte";
  import Form,{Props as IForm} from "@components/form/form.svelte"
  import Icon,{Props as IIcon,AppIcons,AppIconSizes} from "@components/icons/Icon.svelte";
  import {toggleOrder} from "@lib/stores/orders"
import OrdersRowTable from "@components/orders/tables/OrdersRowTable.svelte";
  type IconWithId = IIcon & {id:IconIds}
  export let order : Order; 
  const formState : IForm =  {
    inputs:Object.entries(OrderFormMapping).map(entry =>  {
      const [key,value] = entry;
      return {inputLabel:value, name:key, onChangeHandler:() => {}, value:order[key]}
    }),
    styling: {
      direction:"form-controller__row"
    }
  }
  const popupModalState : IPopupModal = {
    onCloseHandler: () => {
      toggleOrder(order.id)
    },
    title:order.description
  }
  const ctaState : IconWithId[]  = [
    {
      icon:AppIcons.ASSIGN_USER,
      size:AppIconSizes.MEDIUM,
      id:IconIds.ASSIGN_USER
    },
    {
      icon:AppIcons.RELEASE_ORDER,
      size:AppIconSizes.MEDIUM,
      id:IconIds.RELEASE_ORDER
    }
  ]
  const handleIconClick = (id : IconIds)  => {
    console.log(id,"event")
  }
</script>

<section class="order-popup">

  <PopupModal {...popupModalState}>
    <div class="order-popup__order-cta primary-color--dark">
      {#each ctaState as cta }
      <button class="order-popup__order-cta__btn icon-color--info" on:click={() => handleIconClick(cta.id)}>
        <Icon {...cta} />
      </button>
      {/each}
    </div>
    <article class="order-popup__order">
      <Form {...formState} />
    </article>
    <OrdersRowTable />
  </PopupModal>
</section>

<style lang="scss">
.order-popup {
  &__order-cta {
    border-bottom: 1px solid #222;
    min-width: 100%;
    padding:1.6rem 3.2rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap:2rem;
    position: sticky;
    top:0;
    &__btn {
      border:none;
      background: transparent;
      transform: scale(1);
      transition: all 200ms ease;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
        transition: all 200ms ease;
      }
      &:active {
        transform: scale(1.2);
      }
    }
  }
  &__order {
    max-width: 70rem;
  }
}
</style>