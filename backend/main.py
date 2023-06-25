from pydantic import BaseModel
from fastapi import FastAPI, UploadFile, Form
from sql_app.database import store_input_data, store_language, store_solution


class InputDataRequest(BaseModel):
    data: str
    year: int
    day: int


class SolutionDataRequest(BaseModel):
    language: str
    solution: str
    year: int
    day: int


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/input")
async def inputData(input: InputDataRequest):
    return store_input_data(input.data, input.year, input.day)


@app.post("/language")
async def inputLanguage(lang: str = Form(...), file: UploadFile = UploadFile(...)):

    file_data = await file.read()
    file_string = file_data.decode("utf-8")
    store_language(lang, file_string)
    return {"message": "Language data received", "language": lang, "logo": file.filename}


@app.post("/solution")
async def inputSolution(input: SolutionDataRequest):
    return store_solution(SolutionDataRequest.solution, SolutionDataRequest.language, SolutionDataRequest.year, SolutionDataRequest.day)
