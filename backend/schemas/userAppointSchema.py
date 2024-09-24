from marshmallow import Schema, fields

class UserAppointmentSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre = fields.Str(required=True)
    apellido = fields.Str(required=True)
    email = fields.Str(required=True)
    telefono = fields.Int(required=True)
    servicio = fields.Str(required=True)
    fecha = fields.DateTime(required=True)

user_appointSchema = UserAppointmentSchema()
users_appointSchema = UserAppointmentSchema(many=True)