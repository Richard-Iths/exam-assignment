<script context="module" lang="ts">
  export interface Props {
    headers: Array<string|number>;
    useFooter?: boolean;
  }
</script>

<script lang="ts">
  export let headers: Props["headers"];
  export let useFooter: Props["useFooter"] = false;
</script>

<table class={`base-table`}>
  <thead class="base-table__header font-heading--xxs">
    <tr class="base-table__header__row">
      {#each headers as header}
        <td class="base-table__header__row__column">{header}</td>
      {/each}
    </tr>
  </thead>
    <slot name="table-body" />
  {#if useFooter}
      <slot name="table-footer" />
  {/if}
</table>

<style lang="scss">
  .base-table {
    border-collapse: collapse;
    min-width: 100%;
    
    &__header {
      text-align: center;
      text-transform: capitalize;
      &__row {
        &__column {
          padding:1.6rem 3.2rem;
        }
      }

    }
  }
</style>