<script lang="ts">
  import type { OrderRow } from "@src/types";
  import BaseTable, {
    Props as ITableProps,
  } from "@src/lib/components/tables/BaseTable.svelte";
  import Input from "../../forms/inputs/Input.svelte";
  const orderRowHeaders: Record<
    keyof Omit<OrderRow, "id" |"orderId"| "createdAt" | "orderArt"> & {price:string},
    string
  > = {
    orderArtId: "article",
    amount: "amount",
    price: "price",
    total: "total",
  };
  export let orderRows: OrderRow[] = [];

  const tableProps: ITableProps = {
    headers: Object.values(orderRowHeaders),
  };


  const onChangedHandler = (e) => {
  };
</script>

<BaseTable {...tableProps}>
  <tbody class="order-table__body" slot="body">
    {#each orderRows as row}
      <tr class="order-table__row even-background">
        <td class="order-table__column"
          ><Input
            name="article"
            {onChangedHandler}
            type="text"
            placeholder="article"
            value={row.orderArt.description}
            disabled={true}
          /></td
        >
        <td class="order-table__column"
          ><Input
            name="amount"
            {onChangedHandler}
            type="number"
            placeholder="amount"
            value={row.amount.toString()}
            disabled={true}
          /></td
        >
   
      <td class="order-table__column"
        ><Input
          name="price"
          {onChangedHandler}
          type="number"
          placeholder="price"
          value={row.orderArt.price.toString()}
          disabled={true}
        /></td>
        <td class="order-table__column"
        ><Input
          name="total"
          {onChangedHandler}
          type="text"
          placeholder="total"
          value={(+row.orderArt.price * row.amount).toString()}
          disabled={true}
        /></td>
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
