import datetime
from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from sqlalchemy import func
from ..models.db import Session
from ..schemas.userAppointSchema import user_appointSchema, users_appointSchema
from ..models.userAppointment import UserAppointment
from ..models.userClinic import UserClinic
from ..schemas.userClinicSchema import user_clinic_schema, users_clinic_schema

Appoint = Blueprint('appoint', __name__)


# Agregar citas a la base de datos
@Appoint.route('/appointment', methods=['POST'])
def user_appointment():
    if request.method == 'POST':
        session = Session()
        try:
            data = user_appointSchema.load(request.json)
            nombre = data.get('nombre')
            apellido = data.get('apellido')
            email = data.get('email')
            telefono = data.get('telefono')
            servicio = data.get('servicio')
            fecha = data.get('fecha').strftime('%Y-%m-%d %H:%M:%S')
            new_appoint = UserAppointment(nombre=nombre, apellido=apellido, email=email, telefono=telefono, servicio=servicio, fecha=fecha)
            session.add(new_appoint)
            session.commit()
            return jsonify({'message': 'Appointment created successfully ✅'}), 201
        except ValidationError as err:
            print("Errores de validación:", err.messages)
            return jsonify(err.messages), 400
        except Exception as e:
            # revertir la sesion en caso de error
            session.rollback()
            return jsonify({'message': '⚠️ Error insert to Data Base, Contact with Sopport ⚠️'+ str(e)}), 500
        finally:
            session.close()
        
# Mostrar todos los datos de la base de datos 
@Appoint.route('/registrados', methods=['GET'])
def all_registrados():
    if request.method == 'GET':
        session = Session()
        try: 
            users = session.query(UserClinic).all()
            return jsonify(users_clinic_schema.dump(users))
        finally: 
            session.close()

@Appoint.route('/registrado_cita', methods=['GET'])
def all_registrados_cita():
    if request.method == 'GET':
        session = Session()
        try: 
            users = session.query(UserAppointment).all()
            return jsonify(users_appointSchema.dump(users))
        finally: 
            session.close()
    
@Appoint.route('/nuevos_clientes', methods=['GET'])
def nuevos_clientes():
    session = Session()
    try:
        today = datetime.date.today()
        # Contar nuevos usuarios registrados hoy
        count = session.query(func.count(UserClinic.id)).filter(
            func.date(UserClinic.fecha_registro) == today
        ).scalar()
        return jsonify({'nuevos_clientes': count})
    finally:
        session.close()