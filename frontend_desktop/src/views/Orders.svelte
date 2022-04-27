<script>
import OrdersTable from "@src/lib/components/orders/tables/OrdersTable.svelte";

</script>
<section class="orders-view primary-color">
  <div class="orders-view__cta">
    <h4>cta</h4>
  </div>
    <OrdersTable />
</section>

<style lang="scss">
  .orders-view {
    min-height: 100%;
  }
</style>