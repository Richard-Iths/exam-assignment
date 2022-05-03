use crate::models::error_handler::ApplicationErrorCode;
use crate::models::error_handler::ErrorHandler;
use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize)]
pub struct JsonResponse<T> {
  pub data: T,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct JsonAuthError {
  pub error: String,
  pub stack: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct JsonErrorResponse<T> {
  pub error: T,
}
impl<T> JsonResponse<T> {
  pub fn new(data: T) -> Self {
    Self { data }
  }
}

impl<T> JsonErrorResponse<T> {
  pub fn new(error: T) -> Self {
    Self { error }
  }
}

impl From<serde_json::Error> for JsonErrorResponse<String> {
  fn from(err: serde_json::Error) -> Self {
    let error = ErrorHandler {
      error: ApplicationErrorCode::SerdeJson(err),
    };
    error.match_error()
  }
}

impl From<ErrorHandler> for JsonErrorResponse<String> {
  fn from(err: ErrorHandler) -> Self {
    err.match_error()
  }
}

impl From<tauri::api::Error> for JsonErrorResponse<String> {
  fn from(err: tauri::api::Error) -> Self {
    let error = ErrorHandler {
      error: ApplicationErrorCode::TauriApiError(err),
    };
    error.match_error()
  }
}
