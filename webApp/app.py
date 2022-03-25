from lib import *
from settings import *
from model import *


@login_manager.user_loader
def load_user(user_id):
    return users.query.filter_by(id=user_id).first()

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/login' , methods=['GET' , 'POST'])
def login():
  if current_user.is_authenticated:
    return redirect('/')
  if request.method == 'POST':
      username = request.form['username']
      password = request.form['password']
      registeredUser = users.query.filter_by(username=username, password=password).first()
      if registeredUser:
          login_user(registeredUser)
          return redirect(url_for('dashboard'))
      else:
          flash('Incorrect username or password')
          return redirect('/login')
  return render_template('login.html')

@app.route('/register' , methods=['GET' , 'POST'])
def register():
  if current_user.is_authenticated:
    return redirect('/')
  if request.method == 'POST' and request.form['username']:
    username = request.form['username']
    password = request.form['password']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    date_of_birth = request.form['date_of_birth']
    phone_number = request.form['phone_number']
    street = request.form['street']
    city = request.form['city']
    state = request.form['state']
    zip_code = request.form['zip_code']
    country = request.form['country']
    u = users(username=username, email=email, password=password, first_name=first_name, last_name=last_name, date_of_birth=date_of_birth, phone_number=phone_number, street=street, city=city, state=state, zip_code=zip_code, country=country)
    try:
      db.session.add(u)
      db.session.commit()
    except:
      flash('Username or Email already used or Phone number already used')
      return redirect('/register')
    return redirect('/login')
  return render_template('register.html')

@app.route('/dashboard')
@login_required
def dashboard():
  u = db.session.query(products.name, category.category_name, products.quantity, products.price).join(category).join(users).filter(users.username == current_user.username).all()
  if u == []: u = 'You dont have any products yet'
  return render_template('dashboard.html', u=u)

@app.route('/addproduct', methods=['GET' , 'POST'])
@login_required
def addproduct():
  if request.method == 'POST':
    name = request.form['name']
    image = request.form['image']
    categoryname = request.form['category']
    price = request.form['price']
    description = request.form['description']
    quantity = request.form['quantity']
    c = db.session.query(category.id).filter(category.category_name == categoryname).first()
    for i in c:
      c = i
    try:
      q = products(name, image, c, price, description, 0, quantity, current_user.id)
      db.session.add(q)
      db.session.commit()
    except:
      flash('Something went wrong :(')
      return redirect('/addproduct')
    flash('produkt dodany pomyślnie!')
    return redirect('/dashboard')
  return render_template('addproduct.html')

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect('/')

@app.route('/profile/')
def profilenouser():
  cu = ['nie znaleziono uzytkownika']
  return render_template('user.html', prd=cu)

@app.route('/profile/<username>')
def profile(username):
  q = db.session.query(users.username).filter(users.username == username).first()
  if q:
    cu = db.session.query(products.name, category.category_name).join(category).join(users).filter(users.username == username).all()
    if cu:
      pass
    else:
      cu = ['uzytkownik obecnie nic nie sprzedaje']
  else:
    cu = ['nie znaleziono uzytkownika']
  return render_template('user.html', prd=cu)