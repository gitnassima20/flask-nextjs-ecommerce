from flask import Blueprint, request, jsonify
from app import db
from app.services.cart_service import CartService

cart_bp = Blueprint('cart', __name__)

def get_cart_service():
    """Create a new cart service with the current database session"""
    return CartService(db.session)

@cart_bp.route('/cart/add', methods=['POST'])
def add_to_cart():
    """Add a product to the cart"""
    data = request.get_json()
    
    try:
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)
        
        if not product_id:
            return jsonify({'error': 'Product ID is required'}), 400
        
        cart_service = get_cart_service()
        updated_cart = cart_service.add_to_cart(product_id, quantity)
        
        return jsonify({
            'message': 'Product added to cart successfully',
            'cart': updated_cart
        }), 200
    
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500

@cart_bp.route('/cart/remove', methods=['DELETE'])
def remove_from_cart():
    """Remove a product from the cart"""
    data = request.get_json()
    
    try:
        product_id = data.get('product_id')
        quantity = data.get('quantity')
        
        if not product_id:
            return jsonify({'error': 'Product ID is required'}), 400
        
        cart_service = get_cart_service()
        updated_cart = cart_service.remove_from_cart(product_id, quantity)
        
        return jsonify({
            'message': 'Product removed from cart successfully',
            'cart': updated_cart
        }), 200
    
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500

@cart_bp.route('/cart', methods=['GET'])
def get_cart():
    """Retrieve all cart items"""
    try:
        cart_service = get_cart_service()
        cart_items = cart_service.get_cart_items()
        
        return jsonify({
            'cart': cart_items,
            'total_items': len(cart_items)
        }), 200
    
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500

@cart_bp.route('/cart/clear', methods=['DELETE'])
def clear_cart():
    """Clear all items from the cart"""
    try:
        cart_service = get_cart_service()
        cart_service.clear_cart()
        
        return jsonify({
            'message': 'Cart cleared successfully',
            'cart': []
        }), 200
    
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500

@cart_bp.route('/cart/update', methods=['PATCH'])
def update_cart_item():
    """Update the quantity of a specific cart item"""
    data = request.get_json()
    
    try:
        product_id = data.get('product_id')
        quantity = data.get('quantity')
        
        if not product_id or quantity is None:
            return jsonify({'error': 'Product ID and quantity are required'}), 400
        
        cart_service = get_cart_service()
        updated_cart = cart_service.update_cart_item_quantity(product_id, quantity)
        
        return jsonify({
            'message': 'Cart item quantity updated successfully',
            'cart': updated_cart
        }), 200
    
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
