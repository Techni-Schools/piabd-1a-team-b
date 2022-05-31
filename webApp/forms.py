from datetime import date, timedelta
from lib import *


class loginForm(Form):
    username_login = StringField('Username', [validators.DataRequired(), validators.Length(min=4, max=20)], render_kw={"class": "login-username-input"})
    password_login = PasswordField('Password', [validators.DataRequired(), validators.Length(min=8, max=100)], render_kw={"class": "login-password-input"})
    remember = BooleanField('Remember me', [])

class registerForm(Form):
    username = StringField('Username', [validators.DataRequired(), validators.Length(min=4, max=20)], render_kw={"aria-label": "username"})
    password = PasswordField('Password', [validators.DataRequired(), validators.Length(min=8, max=100)], render_kw={"aria-label": "password"})
    confirm = PasswordField('Repeat Password')
    first_name = StringField('First Name', [validators.Length(min=2, max=50)], render_kw={"aria-label": "First name"})
    last_name = StringField('Last Name', [validators.DataRequired(), validators.Length(min=2, max=50)], render_kw={"aria-label": "Last name"})
    email = StringField('Email Address', [validators.Length(min=6, max=50)], render_kw={"aria-label": "Email"})
    date_of_birth = DateField('Date of birth', [validators.DataRequired()], render_kw =  {"aria-label": "Date of Birth"})
    phone_number = TelField('Phone number', [validators.DataRequired()], render_kw={"aria-label": "Phone Number"})
    street = StringField('Street', [validators.DataRequired(), validators.Length(min=5, max=50)], render_kw={"aria-label": "Street"})
    city = StringField('City', [validators.DataRequired(), validators.Length(min=4, max=50)],  render_kw={"aria-label": "City"})
    state = StringField('State', [validators.DataRequired(), validators.Length(min=4, max=50)], render_kw= {"aria-label": "State"})
    zip_code = StringField('Zip code', [validators.DataRequired(), validators.Length(min=4, max=10)], render_kw={"aria-label": "Zip Code"})
    country = StringField('Country', [validators.DataRequired(), validators.Length(min=4, max=50)], render_kw={"aria-label": "Country"})
    accept_tos = BooleanField('I accept the TOS', [validators.DataRequired()])

class newProduct(Form):
    name = StringField('Name', [validators.Length(min=1)])
    image = FileField('Image', validators=[FileRequired(), FileAllowed(list(IMAGES), 'images only')])
    category = SelectField('Category', choices=['Splawik', 'Wendka', 'Przynenty', 'Rzylki', 'Akcesoria'])
    price = DecimalField('Price', [validators.DataRequired(), validators.NumberRange(min=0, max=999)])
    description = TextAreaField('Description')
    quantity = IntegerField('Quantity', [validators.DataRequired(), validators.NumberRange(min=1, max=999)])

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
    first_name = StringField('First Name', [validators.Length(min=3, max=50)], render_kw={'class': 'niewiem'})
    last_name = StringField('Last Name', [validators.Length(min=4, max=50)], render_kw={'class': 'niewiem'})
    email = StringField('Email Address', [validators.Length(min=6, max=50)], render_kw={'class': 'niewiem'})
    date_of_birth = DateField('Date of birth', [], render_kw={'class': 'niewiem'})
    phone_number = TelField('Phone number', [], render_kw={'class': 'niewiem'})
    street = StringField('Street', [validators.Length(min=5, max=50)], render_kw={'class': 'niewiem'})
    city = StringField('City', [validators.Length(min=4, max=50)], render_kw={'class': 'niewiem'})
    state = StringField('State', [validators.Length(min=4, max=50)], render_kw={'class': 'niewiem'})
    zip_code = StringField('Zip code', [validators.Length(min=4, max=10)], render_kw={'class': 'niewiem'})
    country = StringField('Country', [validators.Length(min=4, max=50)], render_kw={'class': 'niewiem'})
class buyProduct(Form):
    kurier = RadioField('', choices=[('fedex','Kurier FedEx'),('pocztex','Kurier Pocztex')], validators=[validators.DataRequired()])
    quantity = IntegerField('Ilość', [validators.DataRequired(), validators.NumberRange(min=1, max=999)], render_kw={'value': 1})
  