# Flask imports
import email
from flask import Blueprint, request, jsonify, session as flask_session
from flask_login import login_user, logout_user, current_user
from marshmallow import ValidationError
from ..app import *
from ..models.userClinic import UserClinic
from ..models.db import Session
from ..schemas.userClinicSchema import user_clinic_schema
import secrets
import bcrypt
from werkzeug.security import generate_password_hash, check_password_hash


auth = Blueprint('auth', __name__)

# Registrar usuario
@auth.route('/register', methods=['POST'])
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
            user = session.query(UserClinic).filter_by(nombre=nombre, email=email).first()
            if user or exist_email:
                return jsonify({'message': 'User already exists ❌'}), 400
            # hashead_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            hashead_password = generate_password_hash(password)
            new_user = UserClinic(nombre=nombre, email=email, password=hashead_password ,role=role)
            new_user.set_password(password)
            new_user.is_active = True
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
    
def generate_token():
    return secrets.token_urlsafe(32)

# Ingresar usuario
@auth.route('/login', methods=['POST'])
def all_login():
    if request.method == 'POST':
        session = Session()
        try:
            data = user_clinic_schema.load(request.json)
            email = data.get('email')
            password = data.get('password')
            user = session.query(UserClinic).filter_by(email=email).first()
            print("Usuario existe:", user is not None)
            if user is None:
                return jsonify({'message': 'Invalid name ❌'}), 400
            hashted = generate_password_hash(password)
            print("Contraseña coincide:", hashted)
            if user.check_password(password):
                token = generate_token()
                flask_session['auth_token'] = token
                print("es un token :",token)
                print(f"nombre: {user.nombre}")
                print(f"email: {user.email}")
                login_user(user)
                user.is_active = True
                print(flask_session)
                session.commit()
                return jsonify({'message': 'Login Success ✅', 'user': user_clinic_schema.dump(user), 'redirect_url': '/DashAd' if user.role == 'admin' else '/appointment'}), 200
            else:
                return jsonify({'message': 'Invalid credentials ❌'}), 400
        except Exception as e:
            return jsonify({'message': str(e)}), 500
            
        finally:
            session.close()
            flask_session.modified = True

# Cerrar Session
@auth.route('/logout', methods=['POST'])
def all_logout():
    if request.method == 'POST':
        print(f"Current user authenticated before logout: {current_user.is_authenticated}")  # Verifica antes de cerrar sesión
        if current_user:
            logout_user()  # Cierra la sesión
            print(f"Current user authenticated after logout: {current_user.is_authenticated}")  # Debería ser False
            flask_session.clear()
            flask_session.pop('auth_token', None)
            return jsonify({'message': 'Logout Success ✅', 'redirect_url': '/'}), 200
        else:
            return jsonify({'message': 'Unauthorized'}), 401
    


@auth.route('/current-user', methods=['GET'])
def get_current_user():
    session = Session()
    if 'auth_token' in flask_session:  # Verifica si hay un token de autenticación
        user_id = flask_session['user_id']  # Asegúrate de que 'user_id' esté almacenado en la sesión
        user = session.query(UserClinic).filter_by(id=user_id).first()
        if user:
            return jsonify({'nombre': user.nombre}), 200  # Devuelve solo el nombre
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify({'message': 'User not logged in'}), 401