from datetime import date, timedelta
from lib import *


class loginForm(Form):
    username_login = StringField('Username', [validators.DataRequired(), validators.Length(min=4, max=20)])
    password_login = PasswordField('Password', [validators.DataRequired(), validators.Length(min=8, max=100)])
    remember = BooleanField('Remember me', [])

class registerForm(Form):
    username = StringField('Username', [validators.DataRequired(), validators.Length(min=4, max=20)])
    password = PasswordField('Password', [validators.DataRequired(), validators.Length(min=8, max=100)])
    confirm = PasswordField('Repeat Password')
    first_name = StringField('First Name', [validators.Length(min=3, max=50)])
    last_name = StringField('Last Name', [validators.DataRequired(), validators.Length(min=4, max=50)])
    email = StringField('Email Address', [validators.Length(min=6, max=50)])
    date_of_birth = DateField('Date of birth', [validators.DataRequired()])
    phone_number = TelField('Phone number', [validators.DataRequired()])
    street = StringField('Street', [validators.DataRequired(), validators.Length(min=5, max=50)])
    city = StringField('City', [validators.DataRequired(), validators.Length(min=4, max=50)])
    state = StringField('State', [validators.DataRequired(), validators.Length(min=4, max=50)])
    zip_code = StringField('Zip code', [validators.DataRequired(), validators.Length(min=4, max=10)])
    country = StringField('Country', [validators.DataRequired(), validators.Length(min=4, max=50)])
    accept_tos = BooleanField('I accept the TOS', [validators.DataRequired()])

class newProduct(Form):
    name = StringField('Name', [validators.Length(min=1)])
    image = FileField('Image', validators=[FileRequired(), FileAllowed(list(IMAGES), 'images only')])
    category = SelectField('Category', choices=['Splawik', 'Wendka', 'Przynenty', 'Rzylki', 'Akcesoria'])
    price = DecimalField('Price', [validators.DataRequired(), validators.NumberRange(min=0, max=99999)])
    description = TextAreaField('Description')
    quantity = IntegerField('Quantity', [validators.DataRequired()])

class addBalance(Form):
    balance = DecimalField('Add Balance', [validators.DataRequired(), validators.NumberRange(min=0, max=999)])

class updateProduct(Form):
    name = StringField('Name', [validators.Length(min=1)])
    image = FileField('Image', validators=[FileAllowed(list(IMAGES), 'images only')])
    category = SelectField('Category', choices=['Splawik', 'Wendka', 'Przynenty', 'Rzylki', 'Akcesoria'])
    price = DecimalField('Price', [validators.DataRequired(), validators.NumberRange(min=0, max=99999)])
    description = TextAreaField('Description')
    quantity = IntegerField('Quantity', [validators.DataRequired()])

class updateProfile(Form):
    first_name = StringField('First Name', [validators.Length(min=3, max=50)])
    last_name = StringField('Last Name', [validators.Length(min=4, max=50)])
    email = StringField('Email Address', [validators.Length(min=6, max=50)])
    date_of_birth = DateField('Date of birth', [])
    phone_number = TelField('Phone number', [])
    street = StringField('Street', [validators.Length(min=5, max=50)])
    city = StringField('City', [validators.Length(min=4, max=50)])
    state = StringField('State', [validators.Length(min=4, max=50)])
    zip_code = StringField('Zip code', [validators.Length(min=4, max=10)])
    country = StringField('Country', [validators.Length(min=4, max=50)])

class buyProduct(Form):
    kurier = RadioField('', choices=[('fedex','Kurier FedEx'),('pocztex','Kurier Pocztex')], validators=[validators.DataRequired()])
    