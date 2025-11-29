from pydantic import BaseModel

class TagCreate(BaseModel):
    title: str
    color: str