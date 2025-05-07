from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from src.config import CORS
from routers.parse import parse_router
from routers.submit import submit_router

app = FastAPI()
app.add_middleware(CORSMiddleware, **CORS)
app.include_router(parse_router)
app.include_router(submit_router)
