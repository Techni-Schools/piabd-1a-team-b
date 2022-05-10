from flask import Flask , request , abort , redirect , Response ,url_for, render_template, flash, jsonify
from flask_login import LoginManager , login_required , UserMixin , login_user, current_user, UserMixin, logout_user
from flask_sqlalchemy import SQLAlchemy
import pymysql
import os
import uuid
from werkzeug.utils import secure_filename
from datetime import datetime
import bcrypt
from flask_wtf.file import FileField, FileRequired, FileAllowed
from werkzeug.datastructures import CombinedMultiDict
from flask_uploads import UploadSet, IMAGES
from wtforms import Form, BooleanField, StringField, PasswordField, validators, DateField, SelectField, IntegerField, FloatField, DecimalField, EmailField, TelField, TextAreaField
"""
trzeba w bibliotece flask_uploads (plik flask_uploads.py) zmienic
from werkzeug import secure_filename,FileStorage
na
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage
"""
