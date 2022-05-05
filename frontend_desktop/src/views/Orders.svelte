<script>
import OrdersCta from "@components/orders/cta/OrdersCta.svelte";
import OrdersTable from "@components/orders/tables/OrdersTable.svelte";
import CreateOrderPopup from "@src/lib/components/orders/popups/CreateOrderPopup.svelte";
let showCreateOrder = false;
$:isCreateOrder = showCreateOrder
</script>
<section class="orders-view primary-color">
  <OrdersCta handleNewOrderPopup={() => (showCreateOrder = !showCreateOrder)}/> 
  <OrdersTable />
  {#if isCreateOrder}
  <CreateOrderPopup />
  {/if}
</section>

<style lang="scss">
  .orders-view {
    min-height: 100%;
    padding:2rem 0;
  }
</style>