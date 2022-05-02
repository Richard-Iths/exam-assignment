use crate::api::api_request;
use crate::models::users::User;
use crate::AppConfigState;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

#[derive(Default, Serialize, Deserialize, Debug)]
pub struct UsersState(pub Mutex<Vec<User>>);

#[tauri::command]
pub async fn init_users(
  app_config: State<'_, AppConfigState>,
  users_state: State<'_, UsersState>,
) -> Result<Vec<User>, String> {
  use api_request::{get, ApiEndpoint};
  let config = app_config.0.lock().unwrap().clone();
  let res = get(ApiEndpoint::GetAllUsers, None, config).await;
  let data = match res.unwrap().read().await {
    Ok(res_body) => res_body.data,
    Err(_) => return Err("something went wrong".to_owned()),
  };
  println!("data is {:?}", data);
  let users: Vec<User> = serde_json::from_value(data).unwrap();
  *users_state.0.lock().unwrap() = users.clone();
  Ok(users)
}
