use crate::models::configs::AppConfig;
use tauri::api::http::{Body, ClientBuilder, HttpRequestBuilder, Response, ResponseType};

pub enum ApiEndpoint {
  GetAllUsers,
  GetUser,
  PostUser,
  PutUser,
  AuthUser,
}
impl ApiEndpoint {
  pub fn match_request(self) -> String {
    let res = match self {
      ApiEndpoint::GetAllUsers => "api/v1/users",
      ApiEndpoint::GetUser => "api/v1/users/<id>",
      ApiEndpoint::PostUser => "api/v1/users",
      ApiEndpoint::PutUser => "api/v1/users/<id>",
      ApiEndpoint::AuthUser => "api/v1/auth",
    };
    res.to_string()
  }
}
pub async fn get(
  url: ApiEndpoint,
  opt_id: Option<&str>,
  app_config: AppConfig,
) -> Result<Response, tauri::api::Error> {
  let mut api_endpoint = format!(
    "{}:{}/{}",
    app_config.host.address,
    app_config.host.port,
    url.match_request()
  );
  if let Some(id) = opt_id {
    api_endpoint = api_endpoint.replace("<id>", id);
  }
  let client = ClientBuilder::new().build().unwrap();
  let request = HttpRequestBuilder::new("GET", api_endpoint)
    .unwrap()
    .response_type(ResponseType::Json);
  let response = client.send(request).await?;
  Ok(response)
}

pub async fn post<T>(
  url: ApiEndpoint,
  opt_id: Option<&str>,
  data: T,
  app_config: AppConfig,
) -> Result<Response, tauri::api::Error>
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
  println!("post api endpoint {:?}", api_endpoint);
  let body_data = Body::Json(serde_json::to_value(data).unwrap());
  let client = ClientBuilder::new().build().unwrap();
  let request = HttpRequestBuilder::new("POST", api_endpoint)
    .unwrap()
    .body(body_data)
    .response_type(ResponseType::Json);
  let response = client.send(request).await?;
  Ok(response)
}
