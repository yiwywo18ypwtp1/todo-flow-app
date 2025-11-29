from fastapi import APIRouter, HTTPException, status
from app.models.auth import User
from app.schemas.auth_schema import UserSignup, UserLogin 
from app.utils.jwt import create_access_token

router = APIRouter()

@router.post("/signup")
async def signup(data: UserSignup):
    hashed = data.hashed_password()

    user = User(
        firstName=data.firstName,
        lastName=data.lastName,
        email=data.email,
        password=hashed,
    )
    await user.save()

    return user


@router.post("/login")
async def signup(data: UserLogin):
    decoded = data.decode_password(data.password)

    if not decoded:
        raise HTTPException(status_conde=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    
    token = create_access_token(data)

    return {"token": token, "message": "Login success"}
    

