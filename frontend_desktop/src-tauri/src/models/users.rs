use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Default, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct User {
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
pub struct UserToken {
  pub jwtToken: String,
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
