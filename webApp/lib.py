from flask import Flask , request , abort , redirect , Response ,url_for, render_template, flash, jsonify
from flask_login import LoginManager , login_required , UserMixin , login_user, current_user, UserMixin, logout_user
from flask_sqlalchemy import SQLAlchemy
import pymysql
import os
from werkzeug.utils import secure_filename
from datetime import datetime
import bcrypt