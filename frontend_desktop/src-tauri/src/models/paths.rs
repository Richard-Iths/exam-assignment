use std::path::Path;
pub enum ApplicationPath {
  AppConfigFile,
}

impl ApplicationPath {
  pub fn into_path(self) -> Option<&'static str> {
    match self {
      ApplicationPath::AppConfigFile => Path::new("./configs/app_config.json").to_str(),
    }
  }
}
