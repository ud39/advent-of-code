import struct
from pydantic import BaseModel
from fastapi import FastAPI
from sql_app.database import store_input_data, store_language, store_solution


class InputDataRequest(BaseModel):
    data: str
    year: int
    day: int


class LanguageDataRequest(BaseModel):
    language: str
    logo: bytes


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
async def inputLanguage(input: LanguageDataRequest):
    binary_data = struct.pack('>Q', 121312312313123)
    return store_language(LanguageDataRequest.language, LanguageDataRequest.logo)


@app.post("/solution")
async def inputSolution(input: SolutionDataRequest):
    return store_solution(SolutionDataRequest.solution, SolutionDataRequest.language, SolutionDataRequest.year, SolutionDataRequest.day)
