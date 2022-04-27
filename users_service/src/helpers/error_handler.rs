use rocket::{
  http::ContentType,
  request::Request,
  response::{self, Responder, Response},
};

use std::io::Cursor;

#[derive(Debug)]
pub enum ErrorHandler {
  OrionError(orion::errors::UnknownCryptoError),
  SqlError(postgres::Error),
}

impl ErrorHandler {
  pub fn match_self(self) -> &'static str {
    use postgres::Error;
    match self {
      ErrorHandler::OrionError(_) => "Something went wrong encrypting / decrypting password",
      ErrorHandler::SqlError(_) => "Internal server error",
    }
  }
}

impl From<orion::errors::UnknownCryptoError> for ErrorHandler {
  fn from(err: orion::errors::UnknownCryptoError) -> Self {
    Self::OrionError(err)
  }
}

impl From<postgres::Error> for ErrorHandler {
  fn from(err: postgres::Error) -> Self {
    Self::SqlError(err)
  }
}

impl<'r> Responder<'r, 'static> for ErrorHandler {
  fn respond_to(self, _: &'r Request<'_>) -> response::Result<'static> {
    error!("error handler: {:?}", self);
    let error_message = format!("error: {}", self.match_self());
    Response::build()
      .status(rocket::http::Status::default())
      .sized_body(error_message.len(), Cursor::new(error_message))
      .header(ContentType::JSON)
      .ok()
  }
}
