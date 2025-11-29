from pydantic import BaseModel, EmailStr
from app.utils.security import hash_pass, verify_pass

class UserSignup(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str

    def hashed_password(self):
        return hash_pass(self.password)


class UserLogin(BaseModel):
    email: str
    password: str

    def decode_password(self, hashed):
        return verify_pass(self.password, hashed)