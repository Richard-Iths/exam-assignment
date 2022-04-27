use crate::models::users::UserRoles;
use rocket::serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize)]
pub struct UpdateUser {
  pub username: String,
  pub active: bool,
  pub user_role: String,
}
