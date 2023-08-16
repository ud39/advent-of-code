from sqlalchemy import create_engine, Integer, String, Column, CheckConstraint, ForeignKey, ForeignKeyConstraint, select, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, mapped_column, relationship, Session
from fastapi.encoders import jsonable_encoder
from dotenv import load_dotenv

import os
import datetime

load_dotenv()

user = os.getenv("POSTGRESUSER")
pwd = os.getenv("POSTGRESPWD")
current_year = datetime.datetime.now().year

SQLALCHEMY_DATABASE_URL = "postgresql://jutiboottawong:@localhost/advent_of_code"
#SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{pwd}@database:5432/advent_of_code"


# TODO after deployment don't forget to remove echo
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)


Base = declarative_base()


class InputData(Base):
    __tablename__ = 'input_data'

    data = Column(String, nullable=False)
    title = Column(String, nullable=False)
    year = Column(Integer, CheckConstraint('year > 2015'), primary_key=True)
    day = Column(Integer, CheckConstraint('day > 0 AND day < 26'), primary_key=True)


class Language(Base):
    __tablename__ = 'language'

    id = mapped_column(Integer, primary_key=True)
    solution = relationship("Solution", back_populates="language")
    language = Column(String, nullable=False, unique=True)
    logo = Column(String, nullable=False)


class Solution(Base):
    __tablename__ = 'solution'

    id = mapped_column(Integer, primary_key=True)
    language_id = mapped_column(ForeignKey("language.id"))
    language = relationship("Language", back_populates="solution")
    code = Column(String, nullable=False)
    year = Column(Integer, CheckConstraint('year > 2015'), primary_key=True)
    day = Column(Integer, CheckConstraint('day > 0 AND day < 26'), primary_key=True)

    __table_args__ = (
        ForeignKeyConstraint(
            ["year", "day"], ["input_data.year", "input_data.day"]
        ),
    )


#Base.metadata.create_all(engine, checkfirst=True)
Base.metadata.create_all(engine)
Session: Session = sessionmaker(bind=engine)


def store_input_data(data: str, title: str, year: int, day: int):
    with Session() as session:  # type: Session
        data = InputData(data=data, title=title, year=year, day=day)
        session.add(data)
        session.commit()


def store_language(language: str, logo: str):

    with Session() as session:
        data = Language(language=language, logo=logo)
        session.add(data)
        session.commit()
        session.close()


def store_solution(solution: str, language: str, year: int, day: int):

    with Session() as session:
        languageID = session.execute(select(Language).where(Language.language == language))
        data = Solution(solution=solution, languageID=languageID, year=year, day=day)
        session.add(data)
        session.commit()
        session.close()


def get_solutions(year: int):
    with Session() as session:
        results = session.query(Solution).filter(Solution.year == year).all()
        #solutions = [{"title": title, **solution.__dict__} for solution, title in results]
        solutions = [row for row in results]
        return solutions


def get_solutions_language(year: int):
    with Session() as session:
        query_result = (
            session.query(Language)
            .join(Solution)
            .filter(Solution.year == year)
            .distinct(Language.id)
            .all()
        )
        languages = []
        for language in query_result:
            language_data = {
                "id": language.id,
                "language": language.language,
                "logo": language.logo
            }
            languages.append(language_data)
        return languages


def get_Inputs(year: int):
    with Session() as sesssion:
        results = (
            sesssion.query(InputData)
            .filter(InputData.year == year).all()
        )
        inputs = [row for row in results]
        return inputs
