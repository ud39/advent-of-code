from sqlalchemy import create_engine, Integer, String, Column, CheckConstraint, ForeignKey, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, mapped_column, relationship


SQLALCHEMY_DATABASE_URL = "postgresql://jutiboottawong:@localhost/advent_of_code"

# TODO after deployment don't forget to remove echo
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

Base = declarative_base()


class InputData(Base):
    __tablename__ = 'input_data'

    data = Column(String, nullable=False)
    year = Column(Integer, CheckConstraint('year > 2015'), primary_key=True)
    day = Column(Integer, CheckConstraint('day > 0 AND day < 26'), primary_key=True)


class Language(Base):
    __tablename__ = 'language'

    id = mapped_column(Integer, primary_key=True)
    solution = relationship("Solution", back_populates="language")
    language = Column(String, nullable=False)
    logo = Column(LargeBinary, nullable=False)


class Solution(Base):
    __tablename__ = 'solution'

    id = mapped_column(Integer, primary_key=True)
    language_id = mapped_column(ForeignKey("language.id"))
    language = relationship("Language", back_populates="solution")
    year = Column(Integer, CheckConstraint('year > 2015'), primary_key=True)
    day = Column(Integer, CheckConstraint('day > 0 AND day < 26'), primary_key=True)


# Base.metadata.create_all(engine, checkfirst=True)
Base.metadata.create_all(engine)


def store_input_data(data: str, year: int, day: int):

    Session = sessionmaker(bind=engine)
    session = Session()
    data = InputData(data=data, year=year, day=day)
    session.add(data)
    session.commit()
    session.close()


def store_language(language: str, logo: bytes):

    Session = sessionmaker(bind=engine)
    session = Session()
    data = Language(language=language, logo=logo)
    session.add(data)
    session.commit()
    session.close()


def store_solution(solution: str, language: str, year: int, day: int):

    Session = sessionmaker(bind=engine)
    languageID = getLanguageID(language)
    session = Session()
    data = Solution(solution=solution, languageId=languageID, year=year, day=day)
    session.add(data)
    session.commit()
    session.close()


def getLanguageID(language: str) -> int:
    pass
    # TODO: select language and get id
