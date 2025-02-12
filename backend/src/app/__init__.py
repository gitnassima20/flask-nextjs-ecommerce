from flask import Flask
from flask_cors import CORS
from .config import Config
from .routes.product_routes import product_bp

def create_app(config_class=Config):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS
    CORS(app, resources={r"/*": {"origins": app.config['CORS_ORIGINS']}})

    # Register Blueprints
    app.register_blueprint(product_bp, url_prefix='/api/v1')

    return app
