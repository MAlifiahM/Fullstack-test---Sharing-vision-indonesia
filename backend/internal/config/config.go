package config

type Config struct {
	Host          string   `env:"HOST" default:"localhost"`
	Port          int      `env:"PORT" default:"3000"`
	IsDevelopment bool     `env:"IS_DEVELOPMENT" default:"false"`
	ProxyHeader   string   `env:"PROXY_HEADER"`
	Database      Database `envPrefix:"DB_"`
	LogFields     []string `env:"LOG_FIELDS" envSeparator:","`
}

type Database struct {
	Driver   string `env:"DRIVER" default:"mysql"`
	Host     string `env:"HOST" default:"localhost"`
	Port     int    `env:"PORT" default:"3306"`
	UserName string `env:"USERNAME" default:"root"`
	Password string `env:"PASSWORD" default:""`
	DSN      string `env:"DSN"`
}
