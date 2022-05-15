use crate::models::configs::AppConfig;
use crate::models::error_handler::{ApplicationErrorCode, ErrorHandler};
use crate::models::json_response::{JsonErrorResponse, JsonResponse};
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
    Err(ErrorHandler::new(ApplicationErrorCode::AppConfigNotFound))
  }
}
fn write_file(path: ApplicationPath, config: &AppConfig) -> Result<(), ErrorHandler> {
  if let Some(file_path) = path.into_path() {
    let mut file = File::create(file_path)?;
    let json_string = serde_json::to_string(&config).unwrap();
    println!("here json,{}", { &json_string });
    file.write(json_string.as_bytes())?;
    Ok(())
  } else {
    Err(ErrorHandler::new(ApplicationErrorCode::AppConfigNotFound))
  }
}
#[tauri::command]
pub fn init_application_config<'a>(
  app_config: State<AppConfigState>,
) -> Result<JsonResponse<&'static str>, JsonErrorResponse<String>> {
  let file = match read_file(ApplicationPath::AppConfigFile) {
    Ok(res) => res,
    Err(e) => return Err(e.match_error()),
  };

  if file.is_empty() {
    return Err(ErrorHandler::new(ApplicationErrorCode::AppConfigEmpty).match_error());
  } else {
    let config: AppConfig = serde_json::from_str(&file).unwrap();
    *app_config.0.lock().unwrap() = config;
    Ok(JsonResponse::new("config file initialized"))
  }
}
#[tauri::command]
pub fn add_application_config(
  new_config: AppConfig,
  app_config: State<AppConfigState>,
) -> Result<JsonResponse<&'static str>, JsonErrorResponse<String>> {
  match write_file(ApplicationPath::AppConfigFile, &new_config) {
    Ok(()) => {
      *app_config.0.lock().unwrap() = new_config;
      Ok(JsonResponse::new("Config file added"))
    }
    Err(_) => Err(ErrorHandler::new(ApplicationErrorCode::AppConfigNotFound).match_error()),
  }
}
