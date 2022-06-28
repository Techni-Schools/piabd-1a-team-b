from lib import *
from settings import db


class products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(999), unique=True)
    category = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    description = db.Column(db.String(5000), nullable=True)
    discount = db.Column(db.Integer, default=0, nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    uuid_id = db.Column(db.String(100), nullable=False)
    isDeleted = db.Column(db.Boolean, default=False, nullable=False)
    def __init__(self, name, image, category, price, description, discount, quantity, user, uuid_id):
        self.name = name
        self.image = image
        self.category = category
        self.price = price
        self.description = description
        self.discount = discount
        self.quantity = quantity
        self.user = user
        self.uuid_id = uuid_id


class category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(50), unique=True, nullable=False)
    def __init__(self, category_name):
        self.category_name = category_name


class users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.LargeBinary, nullable=False)
    role = db.Column(db.String(20), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    date_of_birth = db.Column(db.DateTime, nullable=False)
    phone_number = db.Column(db.String(12), unique=True, nullable=False)
    street = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.String(10), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    balance = db.Column(db.Integer, nullable=False, default=0)
    image = db.Column(db.String(40), nullable=False)
    def __repr__(self):
        return '<User %r>' % self.username
    def __init__(self, username, password, role, first_name, last_name, email, date_of_birth, phone_number, street, city, state, zip_code, country, image):
        self.username = username
        self.password = password
        self.role = role
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.date_of_birth = date_of_birth
        self.phone_number = phone_number
        self.street = street
        self.city = city
        self.state = state
        self.zip_code = zip_code
        self.country = country
        self.image = image


class chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(100), nullable=False)
    def __init__(self, sender, receiver):
        self.sender = sender
        self.receiver = receiver


class orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_status = db.Column(db.String(50), nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)
    required_date = db.Column(db.DateTime)
    shipped_date = db.Column(db.DateTime)
    payment_method = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    kurier = db.Column(db.String(50), nullable=False)
    def __init__(self, product, user, order_status, order_date, required_date, shipped_date, payment_method, quantity, kurier):
        self.product = product
        self.user = user
        self.order_status = order_status
        self.order_date = order_date
        self.required_date = required_date
        self.shipped_date = shipped_date
        self.payment_method = payment_method
        self.quantity = quantity
        self.kurier = kurier


def create_app():
    if os.path.exists('webApp/site.db'):
        os.remove('webApp/site.db')
    db.create_all()
    l = ['splawik', 'wendka', 'przynenty', 'rzylki', 'akcesoria']
    for i in l:
        q = category(i)
        db.session.add(q)
        db.session.commit()
    from datetime import date
    from datetime import datetime
    from datetime import timedelta
    today = date.today()
    today = datetime.combine(today, datetime.min.time())
    today = today + timedelta(days=-7300)


    q = users('admin', bcrypt.hashpw('adminadmin'.encode(), bcrypt.gensalt()), 'admin', 'admin', 'admin', 'email@email.email', today, 'phone', 'street', 'city', 'state', '02-222', 'country', 'image')
    db.session.add(q)
    db.session.commit()

if __name__ == '__main__':
    create_app()