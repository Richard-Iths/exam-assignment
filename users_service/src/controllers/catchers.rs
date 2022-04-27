use rocket::Request;

#[catch(500)]
pub fn internal_error(req: &Request) -> String {
  format!("I couldn't find '{}'. Try something else?", req.uri())
}
