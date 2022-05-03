use crate::api::api_request::{post, ApiEndpoint};
use crate::models::error_handler::ErrorHandler;
use crate::models::json_response::{JsonAuthError, JsonErrorResponse, JsonResponse};
use crate::models::users::{AuthStatus, AuthUser, UserToken};
use crate::AppConfigState;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;
#[derive(Default, Serialize, Deserialize, Debug)]
pub struct UserAuthState(pub Mutex<UserToken>);

#[tauri::command]
pub async fn authenticate_user(
  auth_user: AuthUser,
  user_auth_state: State<'_, UserAuthState>,
  app_config_state: State<'_, AppConfigState>,
) -> Result<JsonResponse<&'static str>, JsonErrorResponse<String>> {
  let app_config = app_config_state.0.lock().unwrap().clone();
  let res = post::<AuthUser>(ApiEndpoint::AuthUser, None, auth_user, app_config, None).await;
  let (status, data) = match res?.read().await {
    Ok(res_body) => (res_body.status, res_body.data),
    Err(_) => return Err(JsonErrorResponse::new("unauthorized".to_string())),
  };

  match status {
    406 => {
      let json_error = match ErrorHandler::from_json_error_value::<JsonAuthError>(data) {
        Ok(res) => res.error,
        Err(err) => return Err(err.match_error()),
      };
      Err(JsonErrorResponse::new(json_error))
    }
    200 => {
      println!("data {:?}", data);
      let token: JsonResponse<UserToken> = serde_json::from_value(data)?;
      *user_auth_state.0.lock().unwrap() = token.data;
      Ok(JsonResponse::new("authorized"))
    }
    _ => Err(JsonErrorResponse::new(
      AuthStatus::UnAuthorized.match_status(),
    )),
  }
}
#[tauri::command]
pub async fn is_authenticated(
  auth_user_state: State<'_, UserAuthState>,
) -> Result<JsonResponse<String>, JsonErrorResponse<String>> {
  let auth_status = auth_user_state.0.lock().unwrap().clone();
  if auth_status.jwt_token.len() > 0 {
    Ok(JsonResponse::new(AuthStatus::Authorized.match_status()))
  } else {
    Err(JsonErrorResponse::new(
      AuthStatus::UnAuthorized.match_status(),
    ))
  }
}
