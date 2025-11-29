from beanie import Document

class User(Document):
    firstName: str
    lastName: str
    email: str
    password: str

    class Settings:
        name = "users"