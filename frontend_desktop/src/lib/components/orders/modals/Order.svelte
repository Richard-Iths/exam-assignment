<script lang="ts">
import BaseModal,{Props as IBaseModal} from "@components/modal/BaseModal.svelte";
import orderStore from '@lib/stores/orders'
import Form,{Props as IForm} from "@components/forms/Form.svelte";
import type { Order } from "@src/types"
import usersStore from '@src/lib/stores/users';
import OrderRowsTable from "../tables/OrderRowsTable.svelte";

export let orderId : string;

const order = $orderStore.orders.find(o => o.id == +orderId);
const baseModalProps: IBaseModal = {
  title:`Order - ${order.orderNumb ?? '-'}`,
  transition: {
    delay:0,
    direction:"right"
  }
}
const formProps : IForm = {
  btnTitle:"next status",
  handleSubmit:(e) => {
    e.preventDefault()
    console.log("running")
  },
  flexDirection:"row",
  inputs: [{
    name:"empRef" as keyof Order,
    onChangedHandler:() => {},
    type:"text",
    label:"employee",
    placeholder:"employee reference",
    value:order.empRef ? order.empRef.toString() : '-',
    selectListOptions:$usersStore.users.filter(u => u.userRole === "Admin" || u.userRole === "Employee").map(u => u.username)
  },
  {
    name:"customerRef" as keyof Order,
    onChangedHandler:() => {},
    type:"text",
    label:"customer",
    placeholder:"customer reference",
    value:$usersStore.users.find(u => u.id === order.customerRef).username
  },
  {
    name:"orderNumb" as keyof Order,
    onChangedHandler:() => {},
    type:"text",
    label:"order number",
    placeholder:"order number",
    value:order.orderNumb.toString()  
  },
  {
    name:"status" as keyof Order,
    onChangedHandler:() => {},
    type:"text",
    label:"status",
    placeholder:"status",
    selectListOptions:["pending","invocing"],
    value:order.status
  },
  {
    name:"description" as keyof Order,
    onChangedHandler:() => {},
    type:"text",
    label:"description",
    placeholder:"description",
    value:order.description
  },
]
}
</script>


<BaseModal {...baseModalProps}>
  <article class="order" slot="main-content">
    <div class="order__form">
      {#if $usersStore.users.length}
        <Form {...formProps}/>
      {/if}
    </div>
    <div class="order_rows">
      <OrderRowsTable orderRows={order.orderRows}/>
    </div>
  </article>
</BaseModal>

<style lang="scss">
  .order {
    display: grid;
    place-items: center;
    min-width: 32rem;
    &__form {
      max-width: 75rem;
    }
  }
</style>