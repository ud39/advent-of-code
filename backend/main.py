from sql_app.database import store_input_data
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/input")
async def input(path, data_type, day):
    return store_input_data()
