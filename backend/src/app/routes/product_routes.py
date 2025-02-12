from flask import Blueprint, request, jsonify
from sqlalchemy import create_engine
from app.services.product_service import ProductService
from app.models.product import Product
from app import db
from app.config import Config

product_bp = Blueprint('products', __name__)

# Database setup
engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

def get_db_session():
    """Create a new database session"""
    return db.session

@product_bp.route('/products', methods=['GET'])
def get_products():
    """Retrieve all products"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 12, type=int)
    
    session = get_db_session()
    product_service = ProductService(session)
    
    try:
        products = product_service.get_all_products(page, per_page)
        return jsonify(products), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@product_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Retrieve a single product by ID"""
    session = get_db_session()
    product_service = ProductService(session)
    
    try:
        product = product_service.get_product_by_id(product_id)
        if product:
            return jsonify(product), 200
        return jsonify({'error': 'Product not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@product_bp.route('/products', methods=['POST'])
def create_product():
    """Create a new product"""
    data = request.get_json()
    
    session = get_db_session()
    product_service = ProductService(session)
    
    try:
        new_product = product_service.create_product(data)
        return jsonify(new_product), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        session.close()

@product_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update an existing product"""
    data = request.get_json()
    
    session = get_db_session()
    product_service = ProductService(session)
    
    try:
        updated_product = product_service.update_product(product_id, data)
        if updated_product:
            return jsonify(updated_product), 200
        return jsonify({'error': 'Product not found'}), 404
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        session.close()

@product_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete a product"""
    session = get_db_session()
    product_service = ProductService(session)
    
    try:
        if product_service.delete_product(product_id):
            return '', 204
        return jsonify({'error': 'Product not found'}), 404
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        session.close()
