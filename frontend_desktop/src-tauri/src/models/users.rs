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
