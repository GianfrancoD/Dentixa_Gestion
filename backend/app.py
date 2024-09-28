
import os
import secrets
from flask import Flask, redirect, request, jsonify, session as flask_session, url_for
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from sqlalchemy import create_engine, func
from sqlalchemy.ext.declarative import declarative_base
from flask_cors import CORS

from .routes.auth import auth
from .models.db import Session, Base, engine
from .models.userClinic import UserClinic
from .schemas.userClinicSchema import users_clinic_schema
from .schemas.userAppointSchema import user_appointSchema, users_appointSchema
from .models.userAppointment import UserAppointment
from .routes.appointment import Appoint

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = secrets.token_urlsafe(25)

login_manager = LoginManager()
login_manager.init_app(app)
# login_manager.user_loader(login_user)

# session = Session()

app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(Appoint, url_prefix='/appoint')

@login_manager.user_loader
def load_user(user_id):
    return UserClinic.query.get(int(user_id))


if __name__ == '__init__':
    app.run(debug=True)