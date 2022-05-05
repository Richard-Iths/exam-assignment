<script context="module" lang="ts">
  import type {Props  as IBaseTable} from "@components/tables/BaseTable.svelte";
</script>
<script lang="ts">
import BaseTable from "@components/tables/BaseTable.svelte";
import {Order,OrderFormMapping, TauriCommands} from "@src/types"
import orderStore,{toggleOrder,initOrders} from "@lib/stores/orders"
import OrderPopup from "../popups/OrderPopup.svelte";
import { onMount } from "svelte";
import { invoke } from "@tauri-apps/api/tauri";
import type { IJsonResponse } from "@src/lib/models";
import { WebviewWindow } from "@tauri-apps/api/window";
const tableState : IBaseTable = {
  headers: Object.values(OrderFormMapping),
  useFooter:false
}

const openOrder = (order:Order) : void => {
  toggleOrder(order)
}
onMount(async () => {
  try {
const res = await invoke<IJsonResponse<Order[]>>(TauriCommands.GET_ORDERS,{reQuery:false})
//   const webview = new WebviewWindow('theUniqueLabel', {
//   url: 'tauri://localhost/orders/123',
//   title:"New Order",
//   resizable:true
// })
// webview.setFullscreen(true)
const window = await invoke("create_child_window",{id:"15"})
console.log(res,"res")
initOrders([...res.data])
  } catch (error) {
    console.log(error,"error")
  }
})

</script>
<div class="orders-table">
  <BaseTable {...tableState}>
    <tbody slot="table-body" class="orders-table__body">
      {#each $orderStore.orders as order }
    <tr class="orders-table__body__row odd-background hover--dark" on:click={() => openOrder(order)}>
      <td class="orders-table__body__row__column font-text--r">{order.orderNumb}</td>
      <td class="orders-table__body__row__column font-text--r">{order.description}</td>
      <td class="orders-table__body__row__column font-text--r">{order.customerRef ?? '-'}</td>
      <td class="orders-table__body__row__column font-text--r">{order.empRef ?? '-'}</td>
      <td class="orders-table__body__row__column font-text--r">{order.status}</td>
      <td class="orders-table__body__row__column font-text--r">{order.updatedAt}</td>
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
