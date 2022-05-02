use crate::models::json_response::JsonErrorResponse;

pub enum ApplicationErrorCode {
  AppConfigNotFound,
  AppConfigEmpty,
  IOError(std::io::Error),
  TauriError(tauri::Error),
  TauriApiError(tauri::api::Error),
  SerdeJson(serde_json::Error),
}

pub struct ErrorHandler {
  pub error: ApplicationErrorCode,
}

impl ErrorHandler {
  pub fn new(error: ApplicationErrorCode) -> Self {
    Self { error }
  }

  pub fn match_error(self) -> JsonErrorResponse<String> {
    match self.error {
      ApplicationErrorCode::AppConfigNotFound => JsonErrorResponse {
        error: "config file not found".to_string(),
      },
      ApplicationErrorCode::IOError(_) => JsonErrorResponse {
        error: "Something went wrong when trying to read/write file".to_string(),
      },
      ApplicationErrorCode::AppConfigEmpty => JsonErrorResponse {
        error: "Application config is empty".to_string(),
      },
      ApplicationErrorCode::TauriApiError(_) => JsonErrorResponse {
        error: "Request error".to_string(),
      },
      ApplicationErrorCode::TauriError(_) => JsonErrorResponse {
        error: "Internal error".to_string(),
      },
      ApplicationErrorCode::SerdeJson(_) => JsonErrorResponse {
        error: "Serialize/Deserialize json error".to_string(),
      },
    }
  }
  pub fn from_json_error_value<'a, T>(data: serde_json::Value) -> Result<T, ErrorHandler>
  where
    T: serde::de::DeserializeOwned,
  {
    let deserialized_data: T = serde_json::from_value(data)?;
    Ok(deserialized_data)
  }
}

impl From<std::io::Error> for ErrorHandler {
  fn from(err: std::io::Error) -> Self {
    ErrorHandler {
      error: ApplicationErrorCode::IOError(err),
    }
  }
}
impl From<tauri::Error> for ErrorHandler {
  fn from(err: tauri::Error) -> Self {
    ErrorHandler {
      error: ApplicationErrorCode::TauriError(err),
    }
  }
}
impl From<tauri::api::Error> for ErrorHandler {
  fn from(err: tauri::api::Error) -> Self {
    ErrorHandler {
      error: ApplicationErrorCode::TauriApiError(err),
    }
  }
}
impl From<serde_json::Error> for ErrorHandler {
  fn from(err: serde_json::Error) -> Self {
    ErrorHandler {
      error: ApplicationErrorCode::SerdeJson(err),
    }
  }
}
