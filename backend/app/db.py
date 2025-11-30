from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.task import Task
from app.models.auth import User
from app.models.tags import Tag, BaseTag
from app.config import settings

async def init_db():
    client = AsyncIOMotorClient(settings.MONGO_URL)
    db = client[settings.DB_NAME]

    await init_beanie(
        database=db,
        document_models=[Task, User, Tag, BaseTag]
    )
