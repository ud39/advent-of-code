from pydantic import BaseModel
from fastapi import FastAPI
from sql_app.database import store_input_data


class InputDataRequest(BaseModel):
    data: str
    year: int
    day: int


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/input")
async def input(input: InputDataRequest):
    return store_input_data(input.data, input.year, input.day)
