from datetime import date, timedelta
from lib import *


class loginForm(Form):
    username_login = StringField('', [validators.DataRequired(), validators.Length(min=4, max=20)], render_kw={"class": "login-username-input"})
    password_login = PasswordField('', [validators.DataRequired(), validators.Length(min=8, max=100)], render_kw={"class": "login-password-input"})
    remember = BooleanField('Zapamietaj mnie', [])

class registerForm(Form):
    username = StringField('Nazwa użytkownika', [validators.DataRequired(), validators.Length(min=4, max=20)], render_kw={"aria-label": "Nazwa Użytkownika"})
    password = PasswordField('Hasło', [validators.DataRequired(), validators.Length(min=8, max=100)], render_kw={"aria-label": "Hasło"})
    confirm = PasswordField('Powtórz Hasło', render_kw={"aria-label": "Ponownie Hasło"})
    first_name = StringField('Imie', [validators.Length(min=2, max=50)], render_kw={"aria-label": "Imie"})
    last_name = StringField('Nazwisko', [validators.DataRequired(), validators.Length(min=2, max=50)], render_kw={"aria-label": "Nazwisko"})
    email = StringField('Email', [validators.Length(min=6, max=50)], render_kw={"aria-label": "Email"})
    date_of_birth = DateField('Data urodzenia', [validators.DataRequired()], render_kw =  {"aria-label": "Data Urodzenia"})
    phone_number = TelField('Numer Telefonu', [validators.DataRequired()], render_kw={"aria-label": "Numer Telefonu"})
    street = StringField('Ulica', [validators.DataRequired(), validators.Length(min=5, max=50)], render_kw={"aria-label": "Ulica"})
    city = StringField('Miasto', [validators.DataRequired(), validators.Length(min=4, max=50)],  render_kw={"aria-label": "Miasto"})
    state = StringField('Województwo', [validators.DataRequired(), validators.Length(min=4, max=50)], render_kw= {"aria-label": "Województwo"})
    zip_code = StringField('Kod Pocztowy', [validators.DataRequired(), validators.Length(min=4, max=10)], render_kw={"aria-label": "Kod Pocztowy"})
    country = StringField('Kraj', [validators.DataRequired(), validators.Length(min=4, max=50)], render_kw={"aria-label": "Kraj"})
    accept_tos = BooleanField('Akceptuje Regulamin', [validators.DataRequired()])

class newProduct(Form):
    name = StringField('Nazwa Produktu', [validators.Length(min=1)])
    image = FileField('Zdjęcie', validators=[FileRequired(), FileAllowed(list(IMAGES), 'images only')], render_kw={'accept': "image/*"})
    category = SelectField('Kategoria', choices=['splawik', 'wedka', 'przynety', 'zylki', 'akcesoria'])
    price = DecimalField('Cena', [validators.DataRequired(), validators.NumberRange(min=0, max=999)])
    description = TextAreaField('Opis')
    quantity = IntegerField('Ilość', [validators.DataRequired(), validators.NumberRange(min=1, max=999)])

class addBalance(Form):
    balance = DecimalField('', [validators.DataRequired(), validators.NumberRange(min=0, max=999)])

class updateProduct(Form):
    name = StringField('Nazwa Produktu', [validators.Length(min=1)])
    image = FileField('Zdjęcie', validators=[FileAllowed(list(IMAGES), 'images only')])
    category = SelectField('Kategoria', choices=['splawik', 'wedka', 'przynety', 'zylki', 'akcesoria'])
    price = DecimalField('Cena', [validators.DataRequired(), validators.NumberRange(min=0, max=99999)])
    description = TextAreaField('Opis')
    quantity = IntegerField('Ilość', [validators.DataRequired()])

class updateProfile(Form):
    first_name = StringField('Imie', [validators.Length(min=3, max=50)], render_kw={'class': 'niewiem'})
    last_name = StringField('Nazwisko', [validators.Length(min=4, max=50)], render_kw={'class': 'niewiem'})
    email = StringField('Email', [validators.Length(min=6, max=50)], render_kw={'class': 'niewiem'})
    date_of_birth = DateField('Data Urodzenia', [], render_kw={'class': 'niewiem'})
    phone_number = TelField('Numer Telefonu', [], render_kw={'class': 'niewiem'})
    street = StringField('Ulica', [validators.Length(min=5, max=50)], render_kw={'class': 'niewiem'})
    city = StringField('Miasto', [validators.Length(min=4, max=50)], render_kw={'class': 'niewiem'})
    state = StringField('Województwo', [validators.Length(min=4, max=50)], render_kw={'class': 'niewiem'})
    zip_code = StringField('Kod Pocztowy', [validators.Length(min=4, max=10)], render_kw={'class': 'niewiem'})
    country = StringField('Kraj', [validators.Length(min=4, max=50)], render_kw={'class': 'niewiem'})
    image = FileField('', validators=[FileAllowed(list(IMAGES), 'images only')], render_kw={'style': 'display: none;', 'accept': "image/*"})


class buyProduct(Form):
    kurier = RadioField('', choices=[('fedex','Kurier FedEx'),('pocztex','Kurier Pocztex')], validators=[validators.DataRequired()])
    quantity = IntegerField('Ilość', [validators.DataRequired(), validators.NumberRange(min=1, max=999)], render_kw={'value': 1})
  