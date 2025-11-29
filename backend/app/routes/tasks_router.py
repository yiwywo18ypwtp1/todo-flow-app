from fastapi import APIRouter, HTTPException, status
from app.models.task import Task, TaskUpdate
from app.schemas.task_schema import TaskCreate


router = APIRouter()

@router.get("/")
async def get_all_tasks():
    return await Task.find_all().to_list()


@router.post("/")
async def create_task(data: TaskCreate):
    task = Task(**data.dict())
    try:
        await task.insert()
    except Exception as e:
        return {"error: ": str(e)}
    
    return task


@router.get("/search")
async def search_task(q: str = ""):
    tasks = await Task.find({"title": {"$regex": q, "$options": "i"}}).to_list(None)
    if not tasks:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    return tasks

@router.get("/{task_id}")
async def get_task(task_id: str):
    task = await Task.get(task_id)
    if not task:
        raise HTTPException(status.HTTP_404_NOT_FOUND)
    
    return task


@router.patch("/{task_id}")
async def update_task(task_id: str, data: TaskUpdate):
    task = await Task.get(task_id)
    if not task:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    update_data = data.model_dump(exclude_none=True)
    await task.set(update_data)

    return task


@router.delete("/{task_id}")
async def delete_task(task_id: str):
    task = await Task.get(task_id)
    if not task:
        raise HTTPException(status.HTTP_404_NOT_FOUND)
    
    await task.delete()
    return {"message": f"Task {task_id} deleted"}
