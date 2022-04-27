use crate::helpers::error_handler::ErrorHandler;
use orion::pwhash;
pub struct PasswordHandler {
  pub password: pwhash::Password,
}

impl PasswordHandler {
  pub fn new(new_password: &'_ str) -> Result<Self, ErrorHandler> {
    let password = pwhash::Password::from_slice(new_password.as_bytes())?;
    Ok(Self { password })
  }
  pub fn hash(self) -> Result<pwhash::PasswordHash, ErrorHandler> {
    use pwhash::hash_password;
    let hash = hash_password(&self.password, 12, 1 << 12)?;
    Ok(hash)
  }
  pub fn compare(
    input_password: PasswordHandler,
    compare_password: PasswordHandler,
  ) -> Result<(), ErrorHandler> {
    use pwhash::hash_password_verify;
    Ok(hash_password_verify(
      &input_password.hash()?,
      &compare_password.password,
    )?)
  }
}
