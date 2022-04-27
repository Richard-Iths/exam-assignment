use crate::models::json_api::{JsonApiBase, JsonApiData};
use serde::{Deserialize, Serialize};
pub enum AppErrors {
  EmptyConfig,
  ConfigFileNotFound,
  WriteConfigError,
}
pub enum ErrorHandler {
  ApplicationError(AppErrors),
  FileError(std::io::Error),
}
#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ErrorResponseMessage<'a> {
  pub status_code: &'a str,
  pub message: &'a str,
}

impl<'a> ErrorHandler {
  pub fn error_response(&self, path: &'a str) -> JsonApiBase<'a, ErrorResponseMessage<'a>> {
    use std::io::ErrorKind::NotFound;
    match self {
      ErrorHandler::FileError(err) if err.kind() == NotFound => {
        let error =
          ErrorHandler::generate_error("File not found when creating/reading file", "101", path);
        JsonApiBase::new(error)
      }
      ErrorHandler::FileError(_) => {
        let error =
          ErrorHandler::generate_error("Something went wrong when processing a file", "102", path);
        JsonApiBase::new(error)
      }
      ErrorHandler::ApplicationError(AppErrors::EmptyConfig) => {
        let error = ErrorHandler::generate_error("Application Config is empty", "200", path);
        JsonApiBase::new(error)
      }
      ErrorHandler::ApplicationError(AppErrors::ConfigFileNotFound) => {
        let error = ErrorHandler::generate_error("Application Config not found", "201", path);
        JsonApiBase::new(error)
      }
      ErrorHandler::ApplicationError(AppErrors::WriteConfigError) => {
        let error = ErrorHandler::generate_error("Could not write application config", "202", path);
        JsonApiBase::new(error)
      }
    }
  }
  pub fn generate_error(
    message: &'a str,
    status_code: &'a str,
    path: &'a str,
  ) -> Vec<JsonApiData<'a, ErrorResponseMessage<'a>>> {
    vec![JsonApiData {
      resource_type: path,
      attributes: ErrorResponseMessage {
        status_code,
        message,
      },
    }]
  }
}

impl From<std::io::Error> for ErrorHandler {
  fn from(err: std::io::Error) -> Self {
    Self::FileError(err)
  }
}
