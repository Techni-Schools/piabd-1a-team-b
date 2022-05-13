from lib import *

images = UploadSet('images', IMAGES)

class loginForm(Form):
    username = StringField('Username', [validators.DataRequired(), validators.Length(min=4, max=20)])
    password = PasswordField('Password', [validators.DataRequired(), validators.Length(min=8, max=100)])
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
    image = FileField('Image', validators=[FileRequired()])
    category = SelectField('Category', choices=['Splawik', 'Wendka', 'Przynenty', 'Rzylki', 'Akcesoria'])
    price = DecimalField('Price', [validators.DataRequired(), validators.NumberRange(min=0, max=99999)])
    description = TextAreaField('Description')
    quantity = IntegerField('Quantity', [validators.DataRequired()])

class addBalance(Form):
    balance = DecimalField('Add Balance', [validators.DataRequired(), validators.NumberRange(min=0, max=999)])