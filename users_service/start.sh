#!/bin/bash
refinery migrate -e DB_MIGRATION_URI -p ./migrations
cargo watch -x run
