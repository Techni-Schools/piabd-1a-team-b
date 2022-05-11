from email.policy import default
from lib import *
from settings import db


class products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(999), unique=True)
    category = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    description = db.Column(db.String(100), nullable=True)
    discount = db.Column(db.Integer, default=0, nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    uuid_id = db.Column(db.String(100), default=uuid.uuid4(), nullable=False)
    isDeleted = db.Column(db.Boolean, default=False, nullable=False)
    def __init__(self, name, image, category, price, description, discount, quantity, user):
        self.name = name
        self.image = image
        self.category = category
        self.price = price
        self.description = description
        self.discount = discount
        self.quantity = quantity
        self.user = user


class category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(50), unique=True, nullable=False)
    def __init__(self, category_name):
        self.category_name = category_name






class users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
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
    def __repr__(self):
        return '<User %r>' % self.username
    def __init__(self, username, password, first_name, last_name, email, date_of_birth, phone_number, street, city, state, zip_code, country):
        self.username = username
        self.password = password
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
    def __init__(self, product, user, order_status, order_date, required_date, shipped_date, payment_method):
        self.product = product
        self.user = user
        self.order_status = order_status
        self.order_date = order_date
        self.required_date = required_date
        self.shipped_date = shipped_date
        self.payment_method = payment_method

#przykladowe zapytanie z joinem
# u = db.session.query(products.name, category.category_name, users.username).join(category).join(users).all()


#losowi uzytkownicy
# arr = [users('edgzoah', '$2b$12$XYsagRDEW0nc2n6JUN2STuk/ZqYC1P4UOgS4wUAISGYJBYXOeWARS', 'adam', 'blady', 'adam@blady.com', '2006-09-14', '+48662272007', 'dobra 29a', 'warszawa', 'mazowieckie', '02-998', 'polska'), users('juki', '$2b$12$BNAs8ojiHcl/UUELO2m7XelIE/pAWDvom87NGMCHYAGrtgqobbSE2', 'tomasz', 'ogrodnik', 'tomasz@ogrodnik.com', '2007-09-22', '+48688964999', 'wladkow 88', 'warszawa', 'mazowieckie', '02-664', 'polska'), users('twojstary', '$2b$12$EIbZPXfBkfNUI3OPT/v/uOIB8OFfpw21bzoNbBddd1YubAEO1pNxu', 'aleksander', 'wiejak', 'ja@wiejaknakrula.com', '2006-09-24', '+48705758922', 'wladkow 88', 'warszawa', 'mazowieckie', '02-664', 'polska')]
# for i in arr:
#     db.session.add(i)
#     db.session.commit()

#login - edgzoah haslo - dobra123
#login - juki haslo - tomek9999@
#login - twojstary - krulpolska 



#dodanie kategorii
# l = ['splawik', 'wendka', 'przynenty', 'rzylki', 'akcesoria']
# for i in l:
#     q = category(i)
#     db.session.add(q)
#     db.session.commit()



#zeby stworzyc baze
# db.create_all()