from flask import Flask , request , abort , redirect , Response ,url_for, render_template, flash, jsonify, send_from_directory
from flask_login import LoginManager , login_required , UserMixin , login_user, current_user, UserMixin, logout_user
from flask_sqlalchemy import SQLAlchemy, Pagination
from sqlalchemy import func, or_
import pymysql
import os
import uuid
from random import randint
from werkzeug.utils import secure_filename
from datetime import datetime
import bcrypt
from flask_wtf.file import FileField, FileRequired, FileAllowed
from werkzeug.datastructures import CombinedMultiDict
from flask_uploads import UploadSet, IMAGES
from wtforms import Form, RadioField, BooleanField, StringField, PasswordField, validators, DateField, SelectField, IntegerField, FloatField, DecimalField, EmailField, TelField, TextAreaField
"""
trzeba w bibliotece flask_uploads (plik flask_uploads.py) zmienic
from werkzeug import secure_filename,FileStorage
na
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage
""" 

"""
DO FLASK-LOGIN W UserMixin TRZEBA DODAC FUNKCJE GET_BALANCE
POD FUNKCJA GET_ID

def get_balance(self):
    try:
        return str(self.balance)
    except AttributeError:
        raise NotImplementedError("No `balance` attribute - override `get_balance`") from None



def get_address(self):
        try:
            return {'street': self.street, 'city': self.city, 'state': self.state, 'zip_code': self.zip_code, 'country': self.country}
        except AttributeError:
            raise NotImplementedError("No `address` attribute - override `get_address`") from None

TO TEZ


"""
