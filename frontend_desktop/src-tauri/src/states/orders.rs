use crate::api::api_request::{get, post, ApiEndpoint};
use crate::models::json_response::{JsonErrorResponse, JsonResponse};
use crate::models::orders::Order;
use crate::states::app_config::AppConfigState;
use crate::UserAuthState;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::AppHandle;
use tauri::State;

#[derive(Default, Serialize, Deserialize, Debug)]
pub struct OrdersState(pub Mutex<Vec<Order>>);

#[tauri::command]
pub async fn get_orders(
  orders_state: State<'_, OrdersState>,
  app_config_state: State<'_, AppConfigState>,
  user_auth_state: State<'_, UserAuthState>,
  re_query: bool,
) -> Result<JsonResponse<Vec<Order>>, JsonErrorResponse<String>> {
  let orders = orders_state.0.lock().unwrap().clone();
  let app_config = app_config_state.0.lock().unwrap().clone();
  let user_auth = user_auth_state.0.lock().unwrap().clone();
  if orders.len() > 0 && !re_query {
    return Ok(JsonResponse::new(orders));
  }

  let res_data = get(
    ApiEndpoint::GetOrders,
    None,
    app_config,
    Some(user_auth.jwt_token),
  )
  .await?
  .read()
  .await?;

  match res_data.status {
    200 => {
      let orders_data: JsonResponse<Vec<Order>> = serde_json::from_value(res_data.data)?;
      *orders_state.0.lock().unwrap() = orders_data.data.clone();
      Ok(orders_data)
    }
    _ => {
      let orders_err: JsonErrorResponse<String> = serde_json::from_value(res_data.data)?;
      return Err(orders_err);
    }
  }
}
#[tauri::command]
pub fn create_child_window(id: String, app: AppHandle) {
  use tauri::{window::WindowBuilder, WindowUrl};
  #[cfg(any(windows, target_os = "macos"))]
  let main = app.get_window("main").unwrap();
  let url = std::path::PathBuf::from("/orders");
  let child = WindowBuilder::new(&app, id, WindowUrl::App(url))
    .title("Child")
    .inner_size(400.0, 300.0);
  #[cfg(target_os = "macos")]
  let child = child.parent_window(main.ns_window().unwrap());
  #[cfg(windows)]
  let child = child.parent_window(main.hwnd().unwrap());

  child.build().unwrap();
}
