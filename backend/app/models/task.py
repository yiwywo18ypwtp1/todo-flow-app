from beanie import Document
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
    title: str | None
    description: str | None
    status: str | None
    priority: int | None
    dueDate: str | None


class Task(Document):
    title: str
    description: str
    dueDate: str
    priority: int
    status: str
    tags: List[Tag]
    subtasks: List[Subtask]

    class Settings:
        name = "tasks"