<script lang="ts">
import {Order, TauriCommands, User} from "@src/types"
import type {IJsonResponse} from '@lib/models'
import BaseModal,{Props as IBaseModal} from "@src/lib/components/modal/BaseModal.svelte";
import OrdersTable from "@src/lib/components/orders/tables/OrderTable.svelte";
import {initOrders} from '@lib/stores/orders'
import { onMount } from "svelte";
import { invoke } from "@tauri-apps/api/tauri";
import Icon,{Props as IIcon,IconName,IconSize} from "@components/ui/icons/Icon.svelte";
import { initUsers } from "@src/lib/stores/users";
const baseModalProps : IBaseModal = {
  title:"Orders",
  transition: {
    delay:0,
    direction:"right"
  }
}
const addIconProps : IIcon = {
  iconName:IconName.ADD_ICON,
  iconSize:IconSize.EXTRA_LARGE
}
onMount(async () => {
  try {
      const orders = await invoke<IJsonResponse<Order[]>>(TauriCommands.GET_ORDERS,{reQuery:false})
      const users = await invoke<IJsonResponse<User[]>>(TauriCommands.GET_USERS)
      initOrders([...orders.data])
      initUsers([...users.data])
  } catch (err) {
  }
})
</script>
<BaseModal {...baseModalProps}>
  <article slot="main-content" class="orders">
    <div class="orders__cta">
      <button class="orders__cta__btn">
        <Icon {...addIconProps} />
      </button>
    </div>
    <OrdersTable />
  </article>
</BaseModal>

<style lang="scss">
  .orders {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-width: 32rem;
    padding:1.6rem 0;

    &__cta {
      display: flex;
      justify-content: flex-end;
      padding:0 3.2rem;

      &__btn {
        border:none;
        transform: scale(1);
          transition: all ease 200ms;
          background-color: transparent;
        &:hover {
          transform: scale(1.1);
          transition: all ease 200ms;
        }
      }
    }

  }
</style>