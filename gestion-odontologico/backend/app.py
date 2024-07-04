from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

db_nombre = os.getenv('db_nombre')
db_usuario = os.getenv('db_usuario')
db_host = os.getenv('db_host')
db_port = os.getenv('db_port')

engine = create_engine(f'postgresql://{db_usuario}@{db_host}:{db_port}/{db_nombre}')
Session = sessionmaker(bind=engine)
Base = declarative_base()

session = Session()

class userClinic(Base):
    __tablename__ = 'add_user_clinic'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100))
    apellido = Column(String(100))

    def __init__(self, nombre, apellido):
        self.nombre=nombre
        self.apellido=apellido
Base.metadata.create_all(engine)

@app.route('/create', methods=['POST'])
def get_user():
    if request.method == 'POST':
        data = request.json
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        user = session.query(userClinic).filter_by(nombre=nombre, apellido=apellido).first()
        if user:
            return jsonify({'message': 'El usuario ya existe'}), 400
        elif not (nombre and apellido) or not (nombre or apellido):
            return jsonify({'message': 'No se permite Formulario Vacios'}), 400
        else:
            get_user = userClinic(nombre,apellido)
            session.add(get_user)
            session.commit()
            return jsonify(data)

if __name__ == '__init__':
    app.run(debug=True)