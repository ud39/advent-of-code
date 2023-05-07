from sqlalchemy import create_engine, Integer, String, Column, CheckConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = "postgresql://jutiboottawong:@localhost/advent_of_code"

# TODO after deployment don't forget to remove echo
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

Base = declarative_base()


class InputData(Base):
    __tablename__ = 'input_data'

    def __init__(self, data, year, day):

        self.data = data
        self.year = year
        self.day = day

    data = Column(String, nullable=False)
    year = Column(Integer, CheckConstraint('year > 2000'), primary_key=True)
    day = Column(Integer, CheckConstraint('day > 0 AND day < 32'), primary_key=True)


# Base.metadata.create_all(engine, checkfirst=True)
Base.metadata.create_all(engine)


def store_input_data(data: str, year: int, day: int):

    Session = sessionmaker(bind=engine)
    session = Session()
    data = InputData(data=data, year=year, day=day)
    session.add(data)
    session.commit()
    session.close()
