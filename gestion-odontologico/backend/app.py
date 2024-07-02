from flask import Flask
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)

db_nombre = "oplesk"
db_usuario = "gianfranco"
db_host = "localhost"
db_port = "5432"

engine = create_engine(f'postgresql://{db_usuario}@{db_host}:{db_port}/{db_nombre}')




if __name__ == '__init__':
    app.run(debug=True)