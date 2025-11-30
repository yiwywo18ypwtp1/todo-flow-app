from fastapi import APIRouter, Request, HTTPException, status
from app.models.tags import Tag, BaseTag
from app.schemas.tag_schema import TagCreate


router = APIRouter()

@router.get("/")
async def get_all_tags(request: Request):
    user_id = request.state.user_id
    
    base = await BaseTag.find_all().to_list()
    user = await Tag.find(Tag.owner_id == user_id).to_list()

    return {"baseTags":base, "userTags": user}


@router.post("/")
async def create_tag(data: TagCreate, request: Request):
    tag = Tag(**data.dict(), owner_id=request.state.user_id)

    try:
        await tag.insert()
    except Exception as e:
        return {"error: ": str(e)}
    
    return tag


@router.delete("/")
async def delete_tag(tag_id: str, request: Request):
    tag = Tag.get(tag_id)

    if not tag:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    
    if (tag.owner_id != request.state.user_id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    
    await tag.delete()
    return {"message": f"Tag {tag_id} deleted"}
