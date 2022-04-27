CREATE TYPE employee_roles AS ENUM ('accounting','manager','order_manager','order_handler');

CREATE TABLE employee_positions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  position employee_roles NOT NULL DEFAULT 'order_handler',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

