import os
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from ..models.userAppointment import UserAppointment
from ..models.userClinic import UserClinic
from ..models import Base, declarative_base, create_engine
from dotenv import load_dotenv
load_dotenv()

# db_secret_key = os.getenv('SECRET_KEY')
db_nombre = os.getenv('db_nombre')
db_usuario = os.getenv('db_usuario')
db_host = os.getenv('db_host')
db_port = os.getenv('db_port')


engine = create_engine(f'postgresql://{db_usuario}@{db_host}:{db_port}/{db_nombre}')
Session = sessionmaker(bind=engine)

Base.metadata.create_all(engine)