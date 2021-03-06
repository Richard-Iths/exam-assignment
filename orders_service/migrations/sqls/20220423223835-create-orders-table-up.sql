CREATE TYPE order_status AS ENUM ('pending','in_progress','complete');
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_numb SERIAL UNIQUE NOT NULL,
  description TEXT NOT NULL,
  emp_ref INTEGER,
  customer_ref INTEGER,
  status order_status DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER SEQUENCE orders_order_numb_seq RESTART WITH 10000;