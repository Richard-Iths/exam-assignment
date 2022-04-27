use rocket::serde::{Deserialize, Serialize};
#[derive(Deserialize, Serialize)]
pub struct CreateUser {
  pub username: String,
  pub password: String,
  pub user_role: String,
}
