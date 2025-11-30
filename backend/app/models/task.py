from beanie import Document, PydanticObjectId
from pydantic import BaseModel
from typing import List


class Tag(BaseModel):
    id: str
    title: str
    color: str


class Subtask(BaseModel):
    id: str
    title: str
    done: bool


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: str | None = None
    priority: int | None = None
    dueDate: str | None = None


class Task(Document):
    owner_id: PydanticObjectId
    title: str
    description: str
    dueDate: str
    priority: int
    isDone: bool = False
    tags: List[Tag]
    subtasks: List[Subtask]

    class Settings:
        name = "tasks"