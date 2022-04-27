use crate::helpers::error_handler::ErrorHandler;
use crate::helpers::password_handler::PasswordHandler;
use crate::models::dtos::{create_user::CreateUser, update_user::UpdateUser};
use crate::models::users::User;
use crate::models::users::UserRoles;
use rocket_sync_db_pools::postgres::Client;

pub trait UserQueries {
  fn get_user(conn: &mut Client, id: &i32) -> Result<User, ErrorHandler>;
  fn insert_user(conn: &mut Client, user: CreateUser) -> Result<User, ErrorHandler>;
  fn update_user(conn: &mut Client, update_user: UpdateUser, id: i32)
    -> Result<User, ErrorHandler>;
  fn get_all_users(conn: &mut Client) -> Result<Vec<User>, ErrorHandler>;
}
impl User {
  fn from_pg_row(row: &postgres::Row) -> Self {
    Self {
      id: row.get("id"),
      username: row.get("username"),
      password: row.get("password"),
      user_role: row.get("user_role"),
      active: row.get("active"),
      created_at: row.get("create_at"),
      updated_at: row.get("updated_at"),
    }
  }
}
impl UserQueries for User {
  fn get_user(conn: &mut Client, id: &i32) -> Result<User, ErrorHandler> {
    let row = conn.query_one("SELECT * FROM users WHERE id = $1", &[&id])?;
    Ok(User::from_pg_row(&row))
  }
  fn get_all_users(conn: &mut Client) -> Result<Vec<User>, ErrorHandler> {
    let mut transaction = conn.transaction()?;
    let rows = transaction.query("SELECT * FROM users", &[])?;
    let mut users: Vec<User> = vec![];
    for row in rows.iter() {
      users.push(User::from_pg_row(row));
    }
    Ok(users)
  }
  fn insert_user(conn: &mut Client, user: CreateUser) -> Result<User, ErrorHandler> {
    let hashed_password = PasswordHandler::new(&user.password)?.hash()?;
    let user_role = UserRoles::new(&user.user_role);
    let row = conn.query_one(
      "
    INSERT INTO users(username,password,user_role)
    VALUES($1,$2,$3)
    RETURNING *
    ",
      &[
        &user.username,
        &hashed_password.unprotected_as_encoded(),
        &user_role,
      ],
    )?;
    Ok(User::from_pg_row(&row))
  }
  fn update_user(conn: &mut Client, user: UpdateUser, id: i32) -> Result<User, ErrorHandler> {
    let mut transaction = conn.transaction()?;
    let row = transaction.query_one(
      "
    UPDATE users SET 
    username = $1,
    active = $2,
    user_role = $3
    WHERE id = $4
    RETURNING *
    ",
      &[
        &user.username,
        &user.active,
        &UserRoles::new(&user.user_role),
        &id,
      ],
    )?;
    Ok(User::from_pg_row(&row))
  }
}
