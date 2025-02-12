import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    # Create Flask app
    app = Flask(__name__)

    # Load configuration
    app.config.from_object('app.config.Config')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}})

    # Import and register blueprints
    from .routes.product_routes import product_bp
    from .routes.cart_routes import cart_bp
    app.register_blueprint(product_bp, url_prefix='/api/v1')
    app.register_blueprint(cart_bp, url_prefix='/api/v1')

    return app
