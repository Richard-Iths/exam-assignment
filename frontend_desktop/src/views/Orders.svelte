<script>
import OrdersCta from "@components/orders/cta/OrdersCta.svelte";

import OrdersTable from "@components/orders/tables/OrdersTable.svelte";
</script>
<section class="orders-view primary-color">
    <OrdersCta /> 
    <OrdersTable />
</section>

<style lang="scss">
  .orders-view {
    min-height: 100%;
    padding:2rem 0;
  }
</style>