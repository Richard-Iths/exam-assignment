use crate::db::users_service::UsersDbConn;
use crate::helpers::error_handler::ErrorHandler;
use crate::models::dtos::{create_user::CreateUser, update_user::UpdateUser};
use crate::models::users::User;
use crate::repositories::users;
use rocket::serde::json::Json;

#[post("/users", data = "<create_user>")]
pub async fn post_user(conn: UsersDbConn, create_user: Json<CreateUser>) -> Json<User> {
  let res = conn
    .run(move |c| users::insert_user(c, create_user.into_inner()).unwrap())
    .await;
  Json(res)
}
#[get("/users")]
pub async fn get_all_users(conn: UsersDbConn) -> Result<Json<Vec<User>>, ErrorHandler> {
  let res = conn.run(|c| users::get_all_users(c)).await;
  match res {
    Ok(users) => Ok(Json(users)),
    Err(e) => Err(e),
  }
}
#[get("/users/<id>")]
pub async fn get_user(conn: UsersDbConn, id: i32) -> Json<User> {
  let user = conn.run(move |c| users::get_user(c, id)).await.unwrap();
  Json(user)
}
#[put("/users/<id>", data = "<update_user>")]
pub async fn post_update_user(
  conn: UsersDbConn,
  id: i32,
  update_user: Json<UpdateUser>,
) -> Result<Json<User>, ErrorHandler> {
  let res = conn
    .run(move |c| users::update_user(c, update_user.into_inner(), id))
    .await;

  match res {
    Ok(user) => Ok(Json(user)),
    Err(e) => Err(e),
  }
}
