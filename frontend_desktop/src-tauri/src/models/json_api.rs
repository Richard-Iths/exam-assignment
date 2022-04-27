use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, Clone)]
pub struct SuccessResponse {
  message: &'static str,
}

#[derive(Serialize, Deserialize, Default, Clone)]
pub struct JsonApiData<'a, T> {
  #[serde(rename = "type")]
  pub resource_type: &'a str,
  pub attributes: T,
}
#[derive(Serialize, Deserialize, Default, Clone)]
pub struct JsonApiBase<'a, T> {
  pub resources: String,
  #[serde(borrow)]
  pub data: Vec<JsonApiData<'a, T>>,
}

impl<'a, T> JsonApiBase<'a, T> {
  pub fn new(data: Vec<JsonApiData<'a, T>>) -> JsonApiBase<'a, T> {
    JsonApiBase {
      resources: format!("{}", data.len()),
      data,
    }
  }
  pub fn new_success_message() -> JsonApiBase<'static, SuccessResponse> {
    let data = vec![JsonApiData {
      resource_type: "message",
      attributes: SuccessResponse { message: "success" },
    }];
    JsonApiBase::new(data)
  }
}
