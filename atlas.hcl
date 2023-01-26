// Define an environment named "local"
env "local" {
  // Define the URL of the database which is managed in this environment.
  url = "postgres://postgres:@localhost:5433/anythink-market?sslmode=disable&search_path=public"

  // Define the URL of the Dev Database for this environment
  // See: https://atlasgo.io/concepts/dev-database
  dev = "postres://postgres:@localhost:5433/test?sslmode=disable&search_path=public"
}
