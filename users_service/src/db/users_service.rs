use rocket_sync_db_pools::{database, postgres};
#[database("users_service")]
pub struct UsersDbConn(postgres::Client);
