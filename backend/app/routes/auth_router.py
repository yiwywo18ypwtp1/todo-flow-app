from fastapi import APIRouter, HTTPException, status
from app.models.auth import User
from app.schemas.auth_schema import UserSignup, UserLogin 
from app.utils.jwt import create_access_token
from app.utils.security import verify_pass

router = APIRouter()

@router.post("/signup")
async def signup(data: UserSignup):
    user_exist = await User.find_one(User.email == data.email)
    
    if user_exist:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exist"
        )

    hashed = data.hashed_password()

    user = User(
        firstName=data.firstName,
        lastName=data.lastName,
        email=data.email,
        password=hashed,
    )
    await user.save()

    return {"message": "Signup success"}


@router.post("/login")
async def login(data: UserLogin):
    user = await User.find_one(User.email == data.email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_pass(data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    access_token = create_access_token({"sub": str(user.id)})

    return {"token": access_token, "message": "Login success"}
    