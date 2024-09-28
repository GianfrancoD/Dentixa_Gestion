# from flask import blueprints
from sqlalchemy import Column, DateTime, String, Integer, Boolean, func
from ..models import Base
from flask_login import UserMixin, current_user, login_required, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash


class UserClinic(Base, UserMixin):
    __tablename__ = 'add_user_dentixa'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100))
    email = Column(String(100), unique=True)
    password_hash = Column(String(255))
    is_active = Column(Boolean, default=False, nullable=False)
    role = Column(String(70), default='user')
    fecha_registro = Column(DateTime, default=func.now())

    def __init__(self, nombre, email, password, role='user'):
        self.nombre=nombre
        self.email=email
        self.password=password
        self.role=role

    def get_id(self):
        return self.id

    def is_active_user(self):
        return self.is_active
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
