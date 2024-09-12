from functools import wraps
import bcrypt
from flask import Flask, request, jsonify
from flask_login import LoginManager, current_user, login_required, login_user
from sqlalchemy import Boolean, create_engine, Column, String, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from marshmallow import Schema, ValidationError, fields
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# para iniciar session
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'all_login'

app.secret_key = os.getenv('SECRET_KEY')
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
    is_active = Column(Boolean, default=False, nullable=False)
    role = Column(String(70), default='user')

    def __init__(self, nombre, email, password, role='user'):
        self.nombre=nombre
        self.email=email
        self.password=password
        self.role=role

    def get_id(self):
        return self.id

    def is_active_user(self):
        return self.is_active
    
Base.metadata.create_all(engine)

class UserClinicSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre = fields.Str(required=True)
    email = fields.Str(required=True, unique=True)
    password = fields.Str(required=True)

user_clinic_schema = UserClinicSchema()
users_clinic_schema = UserClinicSchema(many=True)

# Decorador para proteger endpoint
# def role_required(role):
#     def wrapper(f):
#         @wraps(f)
#         def decorator_f(*args, **kwargs):
#             if not current_user.is_authenticated:
#                 return jsonify({'message': 'Access denied ❌'}), 403
#             if current_user.role != role:
#                 return jsonify({'message': 'Access denied ❌'}), 403
#             return f(*args, **kwargs)
#         return decorator_f
#     return wrapper

# Registrar usuario
@app.route('/register', methods=['POST'])
def get_user():
    if request.method == 'POST':
        session = Session()
        try:
            data = user_clinic_schema.load(request.json)
            nombre = data.get('nombre')
            email = data.get('email')
            password = data.get('password')
            role = data.get('role', 'user')
            exist_email = session.query(UserClinic).filter_by(email=email).first()
            user = session.query(UserClinic).filter_by(nombre=nombre, email=email, password=password, role=role).first()
            if user or exist_email:
                return jsonify({'message': 'User already exists ❌'}), 400
            
            hashead_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            new_user = UserClinic(nombre=nombre, email=email, password=hashead_password, role=role)
            # new_user.is_active = True
            if not new_user.is_active:
                return jsonify({'message': 'Problem, Contact with sopport ⚠️'})
            session.add(new_user)
            session.commit()
            return jsonify({'message': 'User created successfully ✅', 'user': user_clinic_schema.dump(new_user)}), 201
        except ValidationError as err:
            return jsonify(err.messages), 400
        except Exception as e:
            session.rollback()
            return jsonify({"message": str(e)}), 500
        finally:
            session.close()

# Ingresar usuario
@app.route('/login', methods=['POST'])
def all_login():
    if request.method == 'POST':
        session = Session()
        try:
            data = user_clinic_schema.load(request.json)
            email = data.get('email')
            password = data.get('password')
            user = session.query(UserClinic).filter_by(email=email).first()
            if user is None:
                return jsonify({'message': 'Invalid name ❌'}), 400
            hashted = bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8'))
            if user and hashted:
                user.is_active = True
                session.commit()
                login_user(user)
                if user.role == "user" and user.is_active:
                    return jsonify({'message': 'Login Success ✅', 'user': user_clinic_schema.dump(user), 'redirect_url': '/appointment'}), 200
                elif user.role == 'admin' and user.is_active:
                    return jsonify({'message': 'Login Success ✅', 'user': user_clinic_schema.dump(user), 'redirect_url': '/'}), 200
            else:
                return jsonify({'message': 'Invalid password ❌'}), 400
        except Exception as e:
            return jsonify({'message': str(e)}), 500
        finally:
            session.close()

# Cerrar Session
@app.route('/logout', methods=['POST'])
def logout():
    user = login_manager.current_user()
    user.is_active = False
    session.commit()
    login_manager.logout_user()
    return jsonify({'message': 'Session closed successfully'}), 200

        

# Mostrar todos los datos de la base de datos 
@app.route('/registrados', methods=['GET'])
@login_required
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