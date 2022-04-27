use crate::models::configs::AppConfig;
use crate::models::error_handler::{AppErrors, ErrorHandler, ErrorResponseMessage};
use crate::models::json_api::{JsonApiBase, SuccessResponse};
use crate::models::paths::ApplicationPath;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::prelude::*;
use std::sync::Mutex;
use tauri::State;

#[derive(Default, Serialize, Deserialize, Debug)]
pub struct AppConfigState(pub Mutex<AppConfig>);

fn read_file(path: ApplicationPath) -> Result<String, ErrorHandler> {
  if let Some(file_path) = path.into_path() {
    let mut contents = String::new();
    let mut file = File::open(file_path)?;
    file.read_to_string(&mut contents)?;
    Ok(contents)
  } else {
    Err(ErrorHandler::ApplicationError(
      AppErrors::ConfigFileNotFound,
    ))
  }
}
fn write_file(path: ApplicationPath, config: &AppConfig) -> Result<u8, ErrorHandler> {
  if let Some(file_path) = path.into_path() {
    let mut file = File::create(file_path)?;
    let json_string = serde_json::to_string(&config).unwrap();
    println!("here json,{}", { &json_string });
    file.write(json_string.as_bytes())?;
    Ok(0)
  } else {
    Err(ErrorHandler::ApplicationError(
      AppErrors::ConfigFileNotFound,
    ))
  }
}
#[tauri::command]
pub fn init_application_config<'a>(
  app_config: State<AppConfigState>,
) -> Result<AppConfig, JsonApiBase<'a, ErrorResponseMessage<'a>>> {
  let file = match read_file(ApplicationPath::AppConfigFile) {
    Ok(res) => res,
    Err(e) => return Err(e.error_response("states/init/config")),
  };

  if file.is_empty() {
    return Err(
      ErrorHandler::ApplicationError(AppErrors::EmptyConfig).error_response("states/init/config"),
    );
  } else {
    let config: AppConfig = serde_json::from_str(&file).unwrap();
    *app_config.0.lock().unwrap() = config;
    Ok(app_config.0.lock().unwrap().clone())
  }
}

#[tauri::command]
pub fn add_application_config(
  new_config: AppConfig,
  app_config: State<AppConfigState>,
) -> Result<JsonApiBase<'static, SuccessResponse>, JsonApiBase<ErrorResponseMessage>> {
  match write_file(ApplicationPath::AppConfigFile, &new_config) {
    Ok(0) => {
      *app_config.0.lock().unwrap() = new_config;
      Ok(JsonApiBase::<SuccessResponse>::new_success_message())
    }
    Ok(_) => {
      panic!()
    }
    Err(_) => Err(
      ErrorHandler::ApplicationError(AppErrors::WriteConfigError)
        .error_response("states/add/config"),
    ),
  }
}
