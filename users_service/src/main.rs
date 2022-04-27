#[macro_use]
extern crate rocket;
extern crate dotenv;

use dotenv::dotenv;

mod controllers;
mod db;
mod helpers;
mod models;
mod queries;
mod repositories;

#[launch]
async fn rocket() -> _ {
    use controllers::{
        catchers::internal_error,
        users::{get_all_users, get_user, post_update_user, post_user},
    };
    use db::users_service::UsersDbConn;

    dotenv().ok();

    rocket::build()
        .attach(UsersDbConn::fairing())
        .register("/api/v1", catchers![internal_error])
        .mount(
            "/api/v1",
            routes![post_user, post_update_user, get_user, get_all_users],
        )
}
