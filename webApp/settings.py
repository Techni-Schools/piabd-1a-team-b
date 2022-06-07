from sqlalchemy import false
from lib import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'F3HUIF23H8923F9H8389FHXKLN'
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.realpath(__file__).replace(os.path.basename(os.path.realpath(__file__)), ''), 'static', 'images')

login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

def email_validation(x):
    a=0
    y=len(x)
    dot=x.find(".")
    at=x.find("@")
    for i in range (0,at):
        if((x[i]>='a' and x[i]<='z') or (x[i]>='A' and x[i]<='Z')):
            a=a+1
    if(a>0 and at>0 and (dot-at)>0 and (dot+1)<y):
        return True
    else:
        return False