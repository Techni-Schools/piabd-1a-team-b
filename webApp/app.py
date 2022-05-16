from math import prod
from lib import *
from settings import *
from model import *
from forms import loginForm, registerForm, newProduct, addBalance

@login_manager.user_loader
def load_user(user_id):
    return users.query.filter_by(id=user_id).first()

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route("/livesearch",methods=["POST","GET"])
def livesearch():
  searchbox = request.form.get("text")
  allproducts = db.session.query(products.name, users.username).filter(products.name.like(searchbox + '%'), products.isDeleted == 0).join(users).limit(5).all()
  l = []
  for product in allproducts:
    product = list(product)
    l.append({'name':product[0], 'user':product[1]})
  l = tuple(l)
  return jsonify(l)

@app.route('/')
def index():
  return render_template('index.html')
    

@app.route('/balance', methods=['POST', 'GET'])
def balance():
  form = addBalance(request.form)
  if request.method == 'POST' and form.validate():
    db.session.query(users).filter(users.id == current_user.get_id()).update({users.balance: users.balance+form.balance.data})
    db.session.commit()
    flash('balans dodany ez')
    return redirect(url_for('dashboard'))
  return render_template('balance.html', form=form)

@app.route('/login' , methods=['GET' , 'POST'])
def login():
  if current_user.is_authenticated:
    return redirect('/')
  form = loginForm(request.form)
  form1 = registerForm(request.form)
  # if request.method == 'POST' and form.validate():
  #   print(form.first_name.data)
  #   return redirect('/login')
  if request.method == 'POST' and form.validate():
    username = form.username.data
    password = form.password.data
    loggedUser = users.query.filter_by(username=username).first()
    if loggedUser:
      if bcrypt.checkpw(password.encode(), (loggedUser.password).encode()):
        login_user(loggedUser, remember=form.remember.data)
        return redirect(url_for('dashboard'))
      else:
        flash('Incorrect username or password')
        return redirect('/login')
    else:
        flash('Incorrect username or password')
        return redirect('/login')
  return render_template('login.html', form=form, form1=form1)

@app.route('/register' , methods=['GET' , 'POST'])
def register():
  if current_user.is_authenticated:
    return redirect('/')
  form = loginForm(request.form)
  form1 = registerForm(request.form)
  if request.method == 'POST' and form1.validate():
    u = users(username=form1.username.data, email=form1.email.data, password=bcrypt.hashpw((form1.password.data).encode(), bcrypt.gensalt()), first_name=form1.first_name.data, last_name=form1.last_name.data, date_of_birth=form1.date_of_birth.data, phone_number=form1.phone_number.data, street=form1.street.data, city=form1.city.data, state=form1.state.data, zip_code=form1.zip_code.data, country=form1.country.data)
    try:
      db.session.add(u)
      db.session.commit()
    except:
      flash('Username, Email or Phone number already used')
      return redirect('/login')
    return redirect('/login')
  return render_template('login.html', form=form, form1=form1)

@app.route('/dashboard', methods=['POST', 'GET'])
@login_required
def dashboard():
  form = newProduct(CombinedMultiDict((request.files, request.form)))
  if request.method == 'POST' and form.validate():
    myFile = str(uuid.uuid4())
    myUuidId = str(uuid.uuid4())
    form.image.data.save(os.path.join(app.config['UPLOAD_FOLDER'], myFile))
    c = db.session.query(category.id).filter(category.category_name == form.category.data).first()
    c = c[0]
    q = products(form.name.data, myFile, c, form.price.data, form.description.data, 0, form.quantity.data, current_user.id, myUuidId)
    db.session.add(q)
    # ------------------------------------------------------
    #           TRZEBA ZROBIC SPRAWDZENIE CZY ZDJENCIE
    # ------------------------------------------------------
    db.session.commit()
    flash('produkt dodany pomyślnie!')
    return redirect('/dashboard')
  elif request.method == 'POST' and not (form.validate()):
    return redirect('/dashboard')
  else:
    u = db.session.query(products.uuid_id, products.name, products.image, category.category_name, products.quantity, products.price).join(category).join(users).filter(users.username == current_user.username, products.isDeleted == 0).all()
    if u == []: u = ['You dont have any products yet']
    return render_template('dashboard.html', u=u, form=form)

@app.route('/delete')
@login_required
def delete():
  try:
    db.session.query(products).filter(products.uuid_id == str(request.args['product']), products.user == current_user.get_id()).update({products.isDeleted: True})
    db.session.commit()
  except:
    pass
  return redirect('/dashboard')

@app.route('/addproduct', methods=['GET' , 'POST'])
@login_required
def addproduct():
  form = newProduct(CombinedMultiDict((request.files, request.form)))
  if request.method == 'POST' and form.validate():
    myFile = str(uuid.uuid4())
    myUuidId = str(uuid.uuid4())
    form.image.data.save(os.path.join(app.config['UPLOAD_FOLDER'], myFile))
    c = db.session.query(category.id).filter(category.category_name == form.category.data).first()
    c = c[0]
    q = products(form.name.data, myFile, c, form.price.data, form.description.data, 0, form.quantity.data, current_user.id, myUuidId)
    db.session.add(q)
    # ------------------------------------------------------
    #           TRZEBA ZROBIC SPRAWDZENIE CZY ZDJENCIE
    # ------------------------------------------------------
    db.session.commit()
    flash('produkt dodany pomyślnie!')
    return redirect('/dashboard')
  return render_template('addproduct.html', form=form)

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
    try:
      cu = db.session.query(products.name, products.description, products.image, products.price, products.quantity, category.category_name).join(category).join(users).filter(users.username == username, products.isDeleted == 0).filter(products.name.like(request.args['product'])).first()
      if request.args['product'] == '':
        raise ValueError("a should be nonzero")
    except:
      cu = db.session.query(products.name, products.image, category.category_name).join(category).join(users).filter(users.username == username, products.isDeleted == 0).all()
    if cu:
      pass
    else:
      cu = ['uzytkownik obecnie nic nie sprzedaje']
  else:
    cu = ['nie znaleziono uzytkownika']
  return render_template('user.html', prd=cu, user=username)

@app.route('/search', methods=['POST', 'GET'])
def search():
  if request.method == 'POST':
    return redirect('/search?search='+request.form['srch'])
  try:
    cu = db.session.query(products.name, category.category_name, users.username).join(category).join(users).filter(products.name.like('%'+request.args['search']+'%')).all()
    # print(cu) jak to sie rowna [] to zrobic cos w stylu nie znaleziono produktow z taka nazwa
    return render_template('search.html', prd=cu)
  except:
    return redirect('/')

@app.route('/update', methods=['POST', 'GET'])
@login_required
def update():
  cu = db.session.query(products.name, products.description).join(users).filter(products.name == request.args['product']).filter(users.username == current_user.username).first()
  if cu == None:
    flash('nie posiadasz takiego produktu')
    return redirect('/dashboard')
  if request.method == 'POST':
    if request.form['name'] != '' and request.form['description'] != '':
      db.session.query(products).filter(products.name == request.args['product']).update({products.name: request.form['name'], products.description: request.form['description']})
      db.session.commit()
      return redirect('/dashboard')
    else:
      flash('Jakas wartosc byla nullowa :(')
      return redirect('/update?product='+request.args['product'])
  return render_template('update.html', prd=cu)