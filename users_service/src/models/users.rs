use chrono::{DateTime, Utc};
use postgres_types::{FromSql, ToSql};
use rocket::serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, ToSql, FromSql, Debug)]
#[postgres(name = "user_roles")]
pub enum UserRoles {
  #[postgres(name = "admin")]
  Admin,
  #[postgres(name = "employee")]
  Employee,
  #[postgres(name = "customer")]
  Customer,
}

impl UserRoles {
  pub fn new(role: &str) -> Self {
    match role.to_lowercase().as_str() {
      "admin" => Self::Admin,
      "employee" => Self::Employee,
      _ => Self::Customer,
    }
  }
  pub fn match_role(self) -> &'static str {
    match self {
      UserRoles::Admin => "admin",
      UserRoles::Customer => "customer",
      UserRoles::Employee => "employee",
    }
  }
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct User {
  pub id: i32,
  pub username: String,
  #[serde(skip_serializing)]
  pub password: String,
  pub user_role: UserRoles,
  pub active: bool,
  pub created_at: DateTime<Utc>,
  pub updated_at: DateTime<Utc>,
}
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct EmployeePosition {
  id: i32,
  user_id: i32,
  position: String,
  created_at: chrono::NaiveDateTime,
}
