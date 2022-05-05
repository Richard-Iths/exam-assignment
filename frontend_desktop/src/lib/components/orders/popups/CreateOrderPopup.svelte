
<script context="module" lang="ts">
  import { OrderCreateFormMapping } from "@src/types";
</script>
<script lang="ts">
  import PopupModal,{Props as IPopupModal} from "@components/modal/PopupModal.svelte";
  import Form,{Props as IForm} from "@components/form/form.svelte"
  const formState : IForm =  {
    inputs:Object.entries(OrderCreateFormMapping).map(([key,value]) =>  {
      return {inputLabel:value, name:key, onChangeHandler:() => {}, value:""}
    }),
    styling: {
      direction:"form-controller__row"
    }
  }
  const popupModalState : IPopupModal = {
    onCloseHandler: () => {
      // toggleOrder()
    },
    title:"Add order"
  }
</script>

<section class="create-order-popup">

  <PopupModal {...popupModalState}>
    <article class="create-order-popup__order">
      <Form {...formState} />
    </article>
  </PopupModal>
</section>

<style lang="scss">
.create-order-popup {
  max-width: 70rem;
  &__order {
    max-width: 70rem;
  }
}
</style>