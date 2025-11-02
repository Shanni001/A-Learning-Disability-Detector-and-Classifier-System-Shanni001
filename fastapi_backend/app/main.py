from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth_routes

app = FastAPI(title="FastAPI + Supabase Authentication")

# Allow frontend (React) to talk to backend
origins = [
    "http://localhost:5173",  # React dev server
    "http://localhost:4028", 
 
    "Network: http://192.168.56.1:4028/", 
    "http://192.168.1.105:4028/", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(auth_routes.router)


@app.get("/")
def home():
    return {"message": "FastAPI + Supabase Auth backend is running!"}
