<script context="module" lang="ts">
  import type {Props  as IBaseTable} from "@components/tables/BaseTable.svelte";
</script>
<script lang="ts">
import BaseTable from "@components/tables/BaseTable.svelte";
import {OrderRowMapping} from "@src/types"
const tableState : IBaseTable = {
  headers: Object.values(OrderRowMapping),
  useFooter:false
}


</script>
<div class="orders-table">
  <BaseTable {...tableState}>
    <!-- <tbody slot="table-body" class="orders-table__body">
      {#each ordersData as order }
    <tr class="orders-table__body__row odd-background hover--dark" on:click={() => openOrder(order)}>
      <td class="orders-table__body__row__column font-text--r">{order.orderNo}</td>
      <td class="orders-table__body__row__column font-text--r">{order.description}</td>
      <td class="orders-table__body__row__column font-text--r">{order.customerRef}</td>
      <td class="orders-table__body__row__column font-text--r">{order.employeeRef}</td>
      <td class="orders-table__body__row__column font-text--r">{order.status}</td>
    </tr> -->
    <!-- {/each} -->
  <!-- </tbody> -->
</BaseTable>
</div>
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
