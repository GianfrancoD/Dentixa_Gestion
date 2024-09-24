from sqlalchemy import Column, DateTime, Integer, String
from ..models import Base

class UserAppointment(Base):
    __tablename__ = 'add_user_appointment'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100))
    apellido = Column(String(100))
    email = Column(String(100))
    telefono = Column(Integer)
    servicio = Column(String(100))
    fecha = Column(DateTime)