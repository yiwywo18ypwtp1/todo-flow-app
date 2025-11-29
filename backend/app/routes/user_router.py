from fastapi import APIRouter, Request, HTTPException, status
from app.models.auth import User

router = APIRouter()

@router.get("/me")
async def get_current_user(request: Request):
    user_id = request.state.user_id  

    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return {
       "firstName": user.firstName,
       "lastName": user.lastName,
        "email" : user.email
    }