from lib import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'F3HUIF23H8923F9H8389FHXKLN'
app.config['UPLOAD_FOLDER'] = 'C:\\Users\\adamo\\OneDrive\\Dokumenty\\GitHub\\piabd-1a-team-b\\webApp\\static'

login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/testowe'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)