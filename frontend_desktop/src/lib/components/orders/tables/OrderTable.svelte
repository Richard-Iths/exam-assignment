<script lang="ts">
  import orderStore from '@lib/stores/orders'
  import type {Order} from '@src/types'
import BaseTable,{Props as ITableProps} from "@src/lib/components/tables/BaseTable.svelte";
const orderHeaders : Record<keyof Omit<Order,"id" | "createdAt">,string> = {
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
</script>


<BaseTable {...tableProps} >
  <tbody class="order-table__body" slot="body">
    {#each $orderStore.orders as order }
    <tr class="order-table__row even-background hover--dark">
      <td class="order-table__column">{order.orderNumb}</td>
      <td class="order-table__column">{order.description}</td>
      <td class="order-table__column">{order.customerRef}</td>
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