from fastapi import FastAPI
from app.db import init_db
from app.middleware.auth import AuthMiddleware
from app.routes.tasks_router import router as tasks_router
from app.routes.auth_router import router as auth_router
from app.routes.user_router import router as users_router


app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await init_db()

app.add_middleware(AuthMiddleware)

app.include_router(tasks_router, prefix="/tasks", tags=["Tasks"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(users_router, prefix="/users", tags=["User"])