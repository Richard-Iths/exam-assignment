use crate::helpers::error_handler::ErrorHandler;
use crate::models::{
  dtos::{create_user::CreateUser, update_user::UpdateUser},
  users::User,
};
use crate::queries::users::UserQueries;
use rocket_sync_db_pools::postgres::Client;

pub fn get_user(conn: &mut Client, id: i32) -> Result<User, ErrorHandler> {
  let res = User::get_user(conn, &id)?;
  Ok(res)
}

pub fn insert_user(conn: &mut Client, user: CreateUser) -> Result<User, ErrorHandler> {
  let res = User::insert_user(conn, user)?;
  Ok(res)
}

pub fn update_user(conn: &mut Client, user_dto: UpdateUser, id: i32) -> Result<User, ErrorHandler> {
  let res = User::update_user(conn, user_dto, id)?;
  Ok(res)
}
pub fn get_all_users(conn: &mut Client) -> Result<Vec<User>, ErrorHandler> {
  let res = User::get_all_users(conn)?;
  Ok(res)
}
