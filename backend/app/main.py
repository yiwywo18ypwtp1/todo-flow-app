from fastapi import FastAPI
from app.db import init_db
from app.middleware.auth import AuthMiddleware
from fastapi.middleware.cors import CORSMiddleware
from app.routes.tasks_router import router as tasks_router
from app.routes.auth_router import router as auth_router
from app.routes.user_router import router as users_router
from app.routes.tags_router import router as tags_router


app = FastAPI()

app.add_middleware(AuthMiddleware)

origins = [
    "https://todo-flow-app.vercel.app",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await init_db()

app.include_router(tasks_router, prefix="/tasks", tags=["Tasks"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(users_router, prefix="/users", tags=["User"])
app.include_router(tags_router, prefix="/tags", tags=["Tags"])