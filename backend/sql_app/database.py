from sqlalchemy import create_engine, text, Integer, String, Column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = "postgresql://jutiboottawong:@localhost/advent_of_code"

# TODO after deployment don't forget to remove echo
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

Session = sessionmaker(bind=engine)
Base = declarative_base()


class InputData(Base):
    __tablename__ = 'input_data'

    def __init__(self, data, year, day):

        self.data = data
        self.year = year
        self.day = day

    data = Column(String, nullable=False)
    year = Column(Integer, primary_key=True)
    day = Column(Integer, primary_key=True)


Base.metadata.create_all(engine, checkfirst=True)

with open('../../2022/input/input_01.txt', 'r') as f:
    input_data = f.read()

session = Session()
data = InputData(data=input_data, year=2022, day=1)
session.add(data)
session.commit()
session.close()
