# app/routers/auth_routes.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from ..utils.supabase_client import supabase
import json

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class RegisterRequest(BaseModel):
    id: str
    email: EmailStr
    password: str
    role: str
    full_name: str
    phone: str | None = None
    school: str | None = None
    age: int | None = None
    parent_name: str | None = None
    parent_phone: str | None = None
    teacher_id: str | None = None
    primary_subject: str | None = None
    grade_levels: list[str] | None = []
    experience: int | None = None


@router.post("/register")
async def register_user(data: RegisterRequest):
    try:
        # ✅ FIX: Ensure grade_levels is always a valid list
        grade_levels = data.grade_levels or []
        if isinstance(grade_levels, str):
            try:
                grade_levels = json.loads(grade_levels)
            except json.JSONDecodeError:
                grade_levels = [grade_levels]

        user_data = {
            "id": data.id,
            "email": data.email,
            "role": data.role,
            "full_name": data.full_name,
            "phone": data.phone,
            "school": data.school,
            "age": data.age,
            "parent_name": data.parent_name,
            "parent_phone": data.parent_phone,
            "teacher_id": data.teacher_id,
            "primary_subject": data.primary_subject,
            "grade_levels": grade_levels,  # ✅ always a clean list
            "experience": data.experience,
        }

        result = supabase.table("user_profiles").insert(user_data).execute()

        if hasattr(result, "error") and result.error:
            raise HTTPException(status_code=400, detail=f"Supabase error: {result.error.message}")

        return {"message": "User profile created successfully!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
