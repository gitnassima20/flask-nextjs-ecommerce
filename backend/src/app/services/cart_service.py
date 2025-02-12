from app import db
from app.models.cart import CartItem
from app.models.product import Product

class CartService:
    def __init__(self, session):
        self.session = session

    def add_to_cart(self, product_id, quantity=1):
        """Add a product to the cart or update its quantity"""
        # Check if product exists
        product = self.session.query(Product).get(product_id)
        if not product:
            raise ValueError(f"Product with id {product_id} not found")

        # Check if product is already in cart
        existing_item = self.session.query(CartItem).filter_by(product_id=product_id).first()
        
        if existing_item:
            # Update quantity if item exists
            existing_item.quantity += quantity
        else:
            # Create new cart item
            new_item = CartItem(product_id=product_id, quantity=quantity)
            self.session.add(new_item)
        
        self.session.commit()
        return self.get_cart_items()

    def remove_from_cart(self, product_id, quantity=None):
        """Remove a product from cart or reduce its quantity"""
        cart_item = self.session.query(CartItem).filter_by(product_id=product_id).first()
        
        if not cart_item:
            raise ValueError(f"Product with id {product_id} not in cart")
        
        if quantity is None or quantity >= cart_item.quantity:
            # Remove entire item
            self.session.delete(cart_item)
        else:
            # Reduce quantity
            cart_item.quantity -= quantity
        
        self.session.commit()
        return self.get_cart_items()

    def get_cart_items(self):
        """Retrieve all cart items"""
        cart_items = self.session.query(CartItem).all()
        return [item.to_dict() for item in cart_items]

    def clear_cart(self):
        """Remove all items from the cart"""
        self.session.query(CartItem).delete()
        self.session.commit()
        return []

    def update_cart_item_quantity(self, product_id, quantity):
        """Update the quantity of a specific cart item"""
        # Check if product exists in cart
        cart_item = self.session.query(CartItem).filter_by(product_id=product_id).first()
        
        if not cart_item:
            raise ValueError(f"Product with id {product_id} not in cart")
        
        # Validate quantity
        if quantity <= 0:
            # If quantity is 0 or negative, remove the item
            self.session.delete(cart_item)
        else:
            # Update quantity
            cart_item.quantity = quantity
        
        self.session.commit()
        return self.get_cart_items()
