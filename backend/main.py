from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/input")
async def input(path, data_type, day):
    return {"message": "Hello World"}
