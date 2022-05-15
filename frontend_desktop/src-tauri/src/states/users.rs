use crate::api::api_request;
use crate::models::json_response::JsonResponse;
use crate::models::users::User;
use crate::AppConfigState;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

#[derive(Default, Serialize, Deserialize, Debug)]
pub struct UsersState(pub Mutex<Vec<User>>);

#[tauri::command]
pub async fn get_users(
  app_config: State<'_, AppConfigState>,
  users_state: State<'_, UsersState>,
) -> Result<JsonResponse<Vec<User>>, String> {
  use api_request::{get, ApiEndpoint};
  let mut users = users_state.0.lock().unwrap().clone();
  if users.len() > 0 {
    return Ok(JsonResponse::new(users));
  }
  let config = app_config.0.lock().unwrap().clone();
  let res = get(ApiEndpoint::GetAllUsers, None, config, None).await;

  let data = match res.unwrap().read().await {
    Ok(res_body) => res_body.data,
    Err(_) => return Err("something went wrong".to_owned()),
  };
  users = serde_json::from_value(data).unwrap();
  *users_state.0.lock().unwrap() = users.clone();
  Ok(JsonResponse::new(users))
}
