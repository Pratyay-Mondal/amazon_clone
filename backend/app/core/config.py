import os

class Settings:
    PROJECT_NAME: str = "Amazon Clone API"
    SQLALCHEMY_DATABASE_URI: str = os.getenv("DATABASE_URL", "sqlite:///./amazon_clone.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-replace-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days for dev convenience

settings = Settings()
