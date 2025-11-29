from beanie import PydanticObjectId
from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.config import settings
from jose import jwt, JWTError, ExpiredSignatureError

PUBLIC_PATHS = [
    "/auth/login",
    "/auth/signup",
    "/docs",
    "/openapi.json",
]


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        for public in PUBLIC_PATHS:
            if path.startswith(public):
                return await call_next(request)
            
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(
                {"detail": "Authorization token missing"}, 
                status_code=401
            )

        token = auth_header.split(" ")[1]

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            
            user_id = payload.get("sub")
            if not user_id:
                return JSONResponse({"detail": "Invalid token payload"}, status_code=401)
            
            request.state.user_id = PydanticObjectId(payload.get("sub"))
        except ExpiredSignatureError:
            return JSONResponse({"detail": "Token expired"}, status_code=401)
        except JWTError:
            return JSONResponse({"detail": "Invalid token"}, status_code=401)

        response = await call_next(request)
        return response