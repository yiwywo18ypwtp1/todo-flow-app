from pydantic import BaseModel
from typing import List
from app.models.task import Tag, Subtask

class TaskCreate(BaseModel):
    title: str
    description: str
    dueDate: str
    priority: int
    isDone: bool = False
    tags: List[Tag]
    subtasks: List[Subtask]