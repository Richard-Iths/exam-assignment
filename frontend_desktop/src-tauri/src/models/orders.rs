use serde::{Deserialize, Serialize};
#[derive(Default, Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct OrderArt {
  pub id: i32,
  pub price: String,
  pub description: String,
  pub created_at: String,
  pub updated_at: String,
}

#[derive(Default, Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct OrderRow {
  pub id: i32,
  pub order_id: i32,
  pub order_art_id: i32,
  pub order_art: OrderArt,
  pub amount: i32,
  pub created_at: String,
  pub updated_at: String,
}
#[derive(Default, Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Order {
  pub id: i32,
  pub order_numb: i32,
  pub emp_ref: Option<i32>,
  pub description: String,
  pub customer_ref: Option<i32>,
  pub status: String,
  pub created_at: String,
  pub updated_at: String,
  pub order_rows: Vec<OrderRow>,
}
