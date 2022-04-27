<script context="module" lang="ts">
  import type {Props  as IBaseTable} from "@components/tables/BaseTable.svelte";
</script>
<script lang="ts">
import BaseTable from "@components/tables/BaseTable.svelte";
import {Order,OrderStatusesMapping,OrderFormMapping} from "@src/types"
import orderStore,{toggleOrder} from "@lib/stores/orders"
import OrderPopup from "../popups/OrderPopup.svelte";
const tableState : IBaseTable = {
  headers: Object.values(OrderFormMapping),
  useFooter:false
}
const ordersData : Order[] = [
  {
    id:10001,
    orderNo:10001,
    description:"first order",
    customerRef:"customer_1",
    employeeRef:"employee_1",
    status:OrderStatusesMapping[0]
    
  },
  {
    id:10002,
    orderNo:10002,
    description:"second order",
    customerRef:"customer_2",
    employeeRef:"employee_2",
    status:OrderStatusesMapping[1]
  },
  {
    id:10003,
    orderNo:10003,
    description:"third order",
    customerRef:"customer_3",
    employeeRef:"employee_3",
    status:OrderStatusesMapping[0]
  },
]

const openOrder = (order:Order) : void => {
  toggleOrder(order)
}

</script>
<div class="orders-table">
  <BaseTable {...tableState}>
    <tbody slot="table-body" class="orders-table__body">
      {#each ordersData as order }
    <tr class="orders-table__body__row odd-background hover--dark" on:click={() => openOrder(order)}>
      <td class="orders-table__body__row__column font-text--r">{order.orderNo}</td>
      <td class="orders-table__body__row__column font-text--r">{order.description}</td>
      <td class="orders-table__body__row__column font-text--r">{order.customerRef}</td>
      <td class="orders-table__body__row__column font-text--r">{order.employeeRef}</td>
      <td class="orders-table__body__row__column font-text--r">{order.status}</td>
    </tr>
    {/each}
  </tbody>
</BaseTable>
</div>
{#each $orderStore.openOrders as openOrder }
  <OrderPopup order={openOrder}/> 
{/each}
<style lang="scss">
.orders-table {
  &__body {
    min-width: 100%;
    text-transform: capitalize;
    text-align: center;
    text-decoration: dashed;
    &__row {
      cursor: pointer;
      &__column {
        padding:1.6rem 3.2rem;
    }
  }
  }
}
</style>
