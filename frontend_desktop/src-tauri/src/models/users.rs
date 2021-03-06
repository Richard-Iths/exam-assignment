use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Default, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct User {
  id: i32,
  username: String,
  active: bool,
  user_role: String,
  created_at: String,
  updated_at: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthUser {
  username: String,
  password: String,
}

#[derive(Serialize, Deserialize, Default, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct UserToken {
  pub jwt_token: String,
}
#[derive(Serialize, Deserialize)]
pub enum AuthStatus {
  UnAuthorized,
  Authorized,
}

impl AuthStatus {
  pub fn match_status(&self) -> String {
    match self {
      AuthStatus::Authorized => "authorized".to_string(),
      AuthStatus::UnAuthorized => "unauthorized".to_string(),
    }
  }
}
