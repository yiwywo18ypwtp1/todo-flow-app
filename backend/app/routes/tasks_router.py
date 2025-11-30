from beanie import PydanticObjectId
from fastapi import APIRouter, Request, HTTPException, status
from app.models.task import Task, TaskUpdate
from app.models.auth import User
from app.schemas.task_schema import TaskCreate


router = APIRouter()

@router.get("/")
async def get_all_tasks(request: Request):
    user_id = request.state.user_id
    if not user_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user with this ID")

    tasks = await Task.find(Task.owner_id == user_id).to_list()

    return tasks


@router.post("/")
async def create_task(data: TaskCreate, request: Request):
    task = Task(**data.dict(), owner_id=request.state.user_id)

    try:
        await task.insert()
    except Exception as e:
        return {"error: ": str(e)}
    
    return task


@router.get("/search")
async def search_task(request: Request, q: str = "", tag: str = ""):
    user_id = request.state.user_id

    query = {"owner_id": user_id}

    if q:
        query["title"] = {"$regex": q, "$options": "i"}

    if tag:
        query["tags.title"] = {"$regex": tag, "$options": "i"}

    tasks = await Task.find(query).to_list(None)

    if not tasks:
        return {"message": "Not found"}

    return tasks


@router.get("/{task_id}")
async def get_task(task_id: str, request: Request):
    task = await Task.get(task_id)

    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    
    if task.owner_id != request.state.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    
    return task


@router.patch("/{task_id}")
async def update_task(task_id: str, data: TaskUpdate, request: Request):
    task = await Task.get(task_id)

    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    
    if task.owner_id != request.state.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    update_data = data.model_dump(exclude_none=True)
    await task.set(update_data)

    return task


@router.delete("/{task_id}")
async def delete_task(task_id: str, request: Request):
    task = await Task.get(task_id)

    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    
    if task.owner_id != request.state.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    
    await task.delete()
    return {"message": f"Task {task_id} deleted"}
