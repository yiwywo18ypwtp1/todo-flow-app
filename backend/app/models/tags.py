from beanie import Document, PydanticObjectId

class Tag(Document):
    owner_id: PydanticObjectId
    title: str
    color: str

    class Settings:
        name = "tags"


class BaseTag(Document):
    title: str
    color: str

    class Settings:
        name = "base_tags"