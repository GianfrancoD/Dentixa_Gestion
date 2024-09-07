import bcrypt
from flask import Flask, make_response, request, jsonify
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from marshmallow import Schema, ValidationError, fields
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
class UserClinic(Base):
    __tablename__ = 'add_user_dentixa'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(100))

    def __init__(self, nombre, email, password):
        self.nombre=nombre
        self.email=email
        self.password=password
Base.metadata.create_all(engine)

class UserClinicSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre = fields.Str(required=True)
    email = fields.Str(required=True, unique=True)
    password = fields.Str(required=True)

user_clinic_schema = UserClinicSchema()
users_clinic_schema = UserClinicSchema(many=True)


@app.route('/register', methods=['POST'])
def get_user():
    if request.method == 'POST':
        session = Session()
        try:
            data = user_clinic_schema.load(request.json)
            nombre = data.get('nombre')
            email = data.get('email')
            password = data.get('password')
            user = session.query(UserClinic).filter_by(nombre=nombre, email=email, password=password).all()
            if user:
                return jsonify({'message': 'El usuario ya existe ❌'}), 400
            
            hashead_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            new_user = UserClinic(nombre=nombre, email=email, password=hashead_password)
            session.add(new_user)
            session.commit()
            return jsonify({'message': 'Usuario creado con éxito ✅', 'user': user_clinic_schema.dump(new_user)}), 201
        except ValidationError as err:
            return jsonify(err.messages), 400
        except Exception as e:
            session.rollback()
            return jsonify({"message": str(e)}), 500
        finally:
            session.close()

@app.route('/login', methods=['POST'])
def alllogin():
    if request.method == 'POST':
        session = Session()
        try:
            data = user_clinic_schema.load(request.json)
            email = data.get('email')
            password = data.get('password')
            user = session.query(UserClinic).filter_by(email=email).first()
            hash = bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8'))
            if user and hash:
                return jsonify({'message': 'Login Success ✅', 'user': user_clinic_schema.dump(user)}), 200
            else: 
                return jsonify({'message': 'Invalid data (email or password) ❌'}), 401
        except Exception as e:
            return jsonify({'message': str(e)}), 500
        finally:
            session.close()

        

        
@app.route('/registrados', methods=['GET'])
def all_registrados():
    if request.method == 'GET':
        session = Session()
        try: 
            users = session.query(UserClinic).all()
            return jsonify(users_clinic_schema.dump(users))
        finally: 
            session.close()
            
            


if __name__ == '__init__':
    app.run(debug=True)