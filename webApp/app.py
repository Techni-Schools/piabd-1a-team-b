from datetime import timedelta
import re
from lib import *
from settings import app, login_manager, db
from model import products, users, orders, category, chat
from forms import loginForm, registerForm, newProduct, addBalance, updateProduct, updateProfile, buyProduct

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
  allproducts = db.session.query(products.name, users.username, products.uuid_id).filter(products.name.like(searchbox + '%'), products.isDeleted == 0).join(users).order_by(products.id.desc()).limit(5).all()
  l = []
  for product in allproducts:
    product = list(product)
    l.append({'name':product[0], 'user':product[1], 'id': product[2]})
  l = tuple(l)
  return jsonify(l)

@app.route('/')
def index():
  return render_template('index.html')
    

@app.route('/balance', methods=['POST', 'GET'])
@login_required
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
    username = form.username_login.data
    password = form.password_login.data
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
    form.image.data.save(os.path.join(app.config['UPLOAD_FOLDER'], myFile))
    c = db.session.query(category.id).filter(category.category_name == form.category.data).first()
    c = c[0]
    q = products(form.name.data, myFile, c, form.price.data, form.description.data, 0, form.quantity.data, current_user.id)
    db.session.add(q)
    # ------------------------------------------------------
    #           TRZEBA ZROBIC SPRAWDZENIE CZY ZDJENCIE
    # ------------------------------------------------------
    db.session.commit()
    flash('produkt dodany pomyślnie!')
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
    return render_template('404.html')
  return redirect('/dashboard')

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect('/')

@app.route('/profile/')
def profilenouser():
  cu = ['nie znaleziono uzytkownika']
  return render_template('user.html', prd=cu)

@app.route('/profile/<string:username>')
def profile(username):
  q = db.session.query(users.username).filter(users.username == username).first()
  if q:
    try:
      cu = db.session.query(products.name, products.description, products.image, products.price, products.quantity, category.category_name).join(category).join(users).filter(users.username == username, products.isDeleted == 0).filter(products.uuid_id.like(request.args['product'])).first()
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

@app.route('/search')
def search():
  if 'string' in request.args:
    if request.args['string'] == '':
      return render_template('404.html')
    prd = db.session.query(products.name, products.image, products.price, category.category_name, users.username).join(users).join(category).filter(products.name.like(request.args['string'] + '%'), products.isDeleted == 0).limit(10).all()
    return render_template('search.html', prd=prd)
  return render_template('404.html')

@app.route('/listing',methods=["POST","GET"])
def listing():
  maxproductspersite = 10
  string = request.form.get('text', '', type=str)
  page = request.form.get('page', 1, type=int)
  if page == 0: page = 1
  print(string)
  if request.form.get('o') == 'pd':
    prd = products.query.join(category, products.category == category.id).join(users, products.user == users.id).filter(products.name.like(string+'%')).order_by(products.price.desc()).paginate(page=page, per_page=maxproductspersite, error_out=False)
  elif request.form.get('o') == 'p':
    prd = products.query.join(category, products.category == category.id).join(users, products.user == users.id).filter(products.name.like(string+'%')).order_by(products.price).paginate(page=page, per_page=maxproductspersite, error_out=False)
  else:
    prd = products.query.join(category, products.category == category.id).join(users, products.user == users.id).filter(products.name.like(string+'%')).paginate(page=page, per_page=maxproductspersite, error_out=False)
  # prd = products.query.join(category, products.category == category.id).join(users, products.user == users.id).filter(products.name.like(string+'%')).paginate(page=page, per_page=maxproductspersite, error_out=False)
  # prd = products.query.paginate(page=2, per_page=5, error_out=False)
  return str([i.name for i in prd.items])
  # l = []
  # for product in prd:
  #   product = list(product)
  #   l.append({'name':product[0], 'user':product[1], 'id': product[2]})
  # l = tuple(l)
  # return jsonify(l)
  # return str(string)
@app.route('/update', methods=['POST', 'GET'])
@login_required
def update():
  try:
    form = updateProduct(CombinedMultiDict((request.files, request.form)))
    cu = db.session.query(products).join(users).filter(products.uuid_id == request.args['product']).filter(users.id == current_user.get_id()).first()
  except:
    return render_template('404.html')
  if cu is None:
    return render_template('404.html')
  path = r'%s' % (os.path.join('images', cu.image),)
  path = path.replace("\\", "/")
  if request.method == 'POST' and form.validate():
    if form.image.data is not None:
      form.image.data.save(os.path.join(app.config['UPLOAD_FOLDER'], cu.image))
    c = db.session.query(category.id).filter(category.category_name == form.category.data).first()
    c = c[0]
    db.session.query(products).filter(products.uuid_id == str(request.args['product'])).update({products.name: form.name.data, products.category: c, products.price: form.price.data, products.description: form.description.data, products.quantity: form.quantity.data})
    db.session.commit()
    return redirect('/dashboard')
  return render_template('update.html', prd=cu, form=form, image=path)

@app.route('/profile/update', methods=['POST', 'GET'])
@login_required
def profile_update():
  form = updateProfile(request.form)
  cu = db.session.query(users).filter(users.id == current_user.get_id()).first()
  cu.date_of_birth = cu.date_of_birth.strftime('%Y-%m-%d')
  # path = r'%s' % (os.path.join('images', cu.image),)
  # path = path.replace("\\", "/")
  if request.method == 'POST' and form.validate():
    # if form.image.data is not None:
      # form.image.data.save(os.path.join(app.config['UPLOAD_FOLDER'], cu.image))
    # c = db.session.query(category.id).filter(category.category_name == form.category.data).first()
    # c = c[0]
    try:
      db.session.query(users).filter(users.id == current_user.get_id()).update({users.first_name: form.first_name.data, users.last_name: form.last_name.data, users.email: form.email.data, users.date_of_birth: form.date_of_birth.data, users.phone_number: form.phone_number.data, users.street: form.street.data, users.city: form.city.data, users.state: form.state.data, users.zip_code: form.zip_code.data, users.country: form.country.data})
      db.session.commit()
    except:
      flash('email lub numer telefonu juz uzywany :(')
      return redirect('/profile/update')
    return redirect('/dashboard')
  return render_template('prfupdate.html', profile=cu, form=form)

@app.route('/buy/<string:uid>', methods=['POST', 'GET'])
@login_required
def buy(uid):
  form = buyProduct(request.form)
  if uid:
    cu = db.session.query(products).filter(products.uuid_id == uid, products.isDeleted == 0).first()
    if cu:
      address = current_user.get_address()
      if request.method == 'POST' and form.validate():
        if int(cu.user) == int(current_user.get_id()):
          flash('nie mozesz kupic swojego produktu :(')
          return redirect(url_for('buy', uid=uid))
        if int(current_user.get_balance()) < int(cu.price):
          flash('za malo kasy mordeczko :(')
          return redirect(url_for('buy', uid=uid))
        db.session.query(users).filter(users.id == current_user.get_id()).update({users.balance: users.balance-cu.price*form.quantity.data})
        db.session.query(products).filter(products.id == cu.id).update({products.quantity: products.quantity-form.quantity.data})
        if cu.quantity >= 0:
          if cu.quantity == 0:
            db.session.query(products).filter(products.id == cu.id).update({products.isDeleted: 1})
          else:
            order = orders(cu.id, current_user.get_id(), 'bought', datetime.now(), datetime.now()+timedelta(days=2), None, 'with account balance', form.quantity.data, form.kurier.data)
            db.session.add(order)
          db.session.commit()
          flash('zakup przebiegl pomyslnie :)')
          return redirect('/dashboard')
        else:
          flash('nie ma tyle produktow')
          return redirect(url_for('buy', uid=uid))
          
      return render_template('buy.html', prd=cu, adr=address, form=form)
  return render_template('404.html')