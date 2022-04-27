<script context="module" lang="ts">
  import type {Props  as IBaseTable} from "@components/tables/BaseTable.svelte";
</script>
<script lang="ts">
import BaseTable from "@components/tables/BaseTable.svelte";
import {User,UserFormMapping} from "@src/types"
const tableState : IBaseTable = {
  headers: Object.values(UserFormMapping),
  useFooter:false
}

export let users : User[];



</script>
<div class="orders-table">
  <BaseTable {...tableState}>
    <tbody slot="table-body" class="orders-table__body">
      {#each users as user }
    <tr class="orders-table__body__row odd-background hover--dark" on:click={() => {}}>
      <td class="orders-table__body__row__column font-text--r">{user.username}</td>
      <td class="orders-table__body__row__column font-text--r">{user.userRole}</td>
      <td class="orders-table__body__row__column font-text--r">{user.active ? 'active' : 'inactive'}</td>
      <td class="orders-table__body__row__column font-text--r">{user.createdAt}</td>
      <td class="orders-table__body__row__column font-text--r">{user.updatedAt}</td>
    </tr>
    {/each}
  </tbody>
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
