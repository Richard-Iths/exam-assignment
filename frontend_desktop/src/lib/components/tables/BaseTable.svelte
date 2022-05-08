<script context="module" lang="ts">
  export interface Props {
    headers: string[]
  }
</script>

<script lang="ts">
  export let headers : Props["headers"]
</script>

<article class="base-table">
  <table class="base-table__table">
    <thead class="base-table__table__header accent-color--dark">
      <tr class="base-table__table__row">
        {#each headers as header}
        <th class="base-table__table__column font-heading--xxs">{header}</th>
      {/each}
      </tr>
    </thead>
      <slot name="body" />
      <slot name="foot" />
  </table>
  <div class="base-table__footer">

  </div>
</article>

<style lang="scss">
  .base-table {
    border-collapse: collapse;
    box-shadow: 1px 0 15px 1px rgba($color: #000, $alpha: .15);
    min-width: 90%;
    &__table {
      min-width: 100%;
      text-align: center  ;
      &__header {
        text-transform: capitalize;
    }
    &__column {
      padding:1.6rem 3.2rem;
    }
}
}
</style>