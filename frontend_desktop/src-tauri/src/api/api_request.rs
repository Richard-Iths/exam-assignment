use crate::models::configs::AppConfig;
use crate::models::error_handler::ErrorHandler;
use crate::models::users::UserToken;
use std::collections::HashMap;
use tauri::api::http::{Body, ClientBuilder, HttpRequestBuilder, Response, ResponseType};

pub enum ApiEndpoint {
  GetAllUsers,
  GetUser,
  PostUser,
  PutUser,
  AuthUser,
  GetOrders,
}
impl ApiEndpoint {
  pub fn match_request(self) -> String {
    let res = match self {
      ApiEndpoint::GetAllUsers => "api/v1/users",
      ApiEndpoint::GetUser => "api/v1/users/<id>",
      ApiEndpoint::PostUser => "api/v1/users",
      ApiEndpoint::PutUser => "api/v1/users/<id>",
      ApiEndpoint::AuthUser => "api/v1/auth",
      ApiEndpoint::GetOrders => "api/v1/orders",
    };
    res.to_string()
  }
}
pub async fn get(
  url: ApiEndpoint,
  opt_id: Option<&str>,
  app_config: AppConfig,
  user_token: Option<String>,
) -> Result<Response, ErrorHandler> {
  let mut api_endpoint = format!(
    "{}:{}/{}",
    app_config.host.address,
    app_config.host.port,
    url.match_request()
  );
  if let Some(id) = opt_id {
    api_endpoint = api_endpoint.replace("<id>", id);
  }
  let mut headers: HashMap<String, String> = HashMap::new();
  let client = ClientBuilder::new().build()?;
  if let Some(token) = user_token {
    headers.insert("Authorization".to_string(), format!("Bearer {}", token));
  }
  let request = HttpRequestBuilder::new("GET", api_endpoint)?
    .response_type(ResponseType::Json)
    .headers(headers);
  let response = client.send(request).await?;
  Ok(response)
}

pub async fn post<T>(
  url: ApiEndpoint,
  opt_id: Option<&str>,
  data: T,
  app_config: AppConfig,
  user_token: Option<UserToken>,
) -> Result<Response, ErrorHandler>
where
  T: serde::Serialize,
{
  let mut api_endpoint = format!(
    "{}:{}/{}",
    app_config.host.address,
    app_config.host.port,
    url.match_request()
  );
  if let Some(id) = opt_id {
    api_endpoint = api_endpoint.replace("<id>", id);
  }
  let mut headers: HashMap<String, String> = HashMap::new();
  let body_data = Body::Json(serde_json::to_value(data)?);
  let client = ClientBuilder::new().build()?;
  let mut request = HttpRequestBuilder::new("POST", api_endpoint)?
    .body(body_data)
    .response_type(ResponseType::Json);

  if let Some(token) = user_token {
    headers.insert("Authorization".to_string(), format!("Bearer {:?}", token));
  }
  request = request.headers(headers);
  let response = client.send(request).await?;
  Ok(response)
}
