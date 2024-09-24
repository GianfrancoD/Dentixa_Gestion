# from flask import blueprints
from sqlalchemy import Column, DateTime, String, Integer, Boolean, func
from ..models import Base
from flask_login import UserMixin, current_user, login_required, login_user, logout_user


class UserClinic(Base, UserMixin):
    __tablename__ = 'add_user_dentixa'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(100))
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
