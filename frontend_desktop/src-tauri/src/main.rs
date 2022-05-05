#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use crate::states::app_config::{add_application_config, init_application_config, AppConfigState};
use crate::states::auth_user::{authenticate_user, is_authenticated, UserAuthState};
use crate::states::orders::{create_child_window, get_orders, OrdersState};
use crate::states::users::{init_users, UsersState};

mod api;
mod models;
mod states;
fn main() {
  tauri::Builder::default()
    .manage(AppConfigState::default())
    .manage(UserAuthState::default())
    .manage(UsersState::default())
    .manage(OrdersState::default())
    .invoke_handler(tauri::generate_handler![
      add_application_config,
      init_application_config,
      init_users,
      authenticate_user,
      is_authenticated,
      get_orders,
      create_child_window
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
