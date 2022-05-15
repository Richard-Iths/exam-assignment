<script lang="ts">
  import {navigate} from 'svelte-navigator'
  import orderStore from '@lib/stores/orders'
  import type {Order} from '@src/types'
import BaseTable,{Props as ITableProps} from "@src/lib/components/tables/BaseTable.svelte";
import usersStore from '@src/lib/stores/users';
const orderHeaders : Record<keyof Omit<Order,"id" | "createdAt" | "orderRows">,string> = {
  orderNumb:"order number",
  description:"description",
  customerRef:"Customer",
  empRef:"employee ref",
  status:"status",
  updatedAt:"updated at"
}
const tableProps : ITableProps = {
  headers: Object.values(orderHeaders),
}
const openOrder = (id : number) => {
  navigate(`orders/${id}`)
}
const getUsername = (userId : number) : string=> {
  const user = $usersStore.users.find(u => u.id === userId);
  if(!user) {
    return "-"
  }
  return user.username
}
</script>


<BaseTable {...tableProps} >
  <tbody class="order-table__body" slot="body">
    {#each $orderStore.orders as order }
    <tr class="order-table__row even-background hover--dark" on:click={() => openOrder(order.id)}>
      <td class="order-table__column">{order.orderNumb}</td>
      <td class="order-table__column">{order.description}</td>
      <td class="order-table__column">{getUsername(order.empRef)}</td>
      <td class="order-table__column">{order.empRef ?? '-'}</td>
      <td class="order-table__column">{order.status}</td>
      <td class="order-table__column">{order.updatedAt}</td>
    </tr>
      {/each}
  </tbody>
</BaseTable>

<style lang="scss">
  .order-table {
    &__row {
      cursor: pointer;
    }
    &__column {
      padding: 1.6rem 3.2rem;

    }
  }
</style>