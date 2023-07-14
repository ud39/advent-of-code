from pydantic import BaseModel
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi import FastAPI, UploadFile, Form, HTTPException, Depends

from scrap_aoc import get_data
from dotenv import load_dotenv
from sql_app.database import store_input_data, store_language, store_solution

import os

load_dotenv()


class InputDataRequest(BaseModel):
    year: int
    day: int


class SolutionDataRequest(BaseModel):
    language: str
    solution: str
    year: int
    day: int


app = FastAPI()
security = HTTPBasic()


def validate_token(credentials: HTTPBasicCredentials):
    user = os.getenv("TOKEN")
    valid_token = os.getenv("SECRET")

    print(f'{user}, {valid_token}')

    if credentials.username == 'foo' and credentials.password == 'bar':
        return True
    else:
        raise HTTPException(
            status_code=401,
            detail='Invalid username or password',
            headers={"WWW-Authenticate": "Basic"},
        )


@app.get("/")
async def root(credentials: HTTPBasicCredentials = Depends(security)):
    validate_token(credentials)
    return {"message": "Hello World"}


@app.post("/input")
async def inputData(input: InputDataRequest, credentials: HTTPBasicCredentials = Depends(security)):
    advent_day = get_data(input.year, input.day)
    return store_input_data(advent_day['input'], input.year, input.day)


@app.post("/language")
async def inputLanguage(lang: str = Form(...), file: UploadFile = UploadFile(...), credentials: HTTPBasicCredentials = Depends(security)):

    file_data = await file.read()
    file_string = file_data.decode("utf-8")
    store_language(lang, file_string)
    return {"message": "Language data received", "language": lang, "logo": file.filename}


@app.post("/solution")
async def inputSolution(input: SolutionDataRequest, credentials: HTTPBasicCredentials = Depends(security)):
    return store_solution(SolutionDataRequest.solution, SolutionDataRequest.language, SolutionDataRequest.year, SolutionDataRequest.day)
