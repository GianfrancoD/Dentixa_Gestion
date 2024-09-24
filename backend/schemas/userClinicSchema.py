from marshmallow import Schema, fields

class UserClinicSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre = fields.Str(required=True)
    email = fields.Str(required=True, unique=True)
    password = fields.Str(required=True)

user_clinic_schema = UserClinicSchema() 
users_clinic_schema = UserClinicSchema(many=True) 