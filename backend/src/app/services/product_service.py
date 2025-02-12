from sqlalchemy.orm import Session
from app.models.product import Product

class ProductService:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def get_all_products(self, page=1, per_page=12):
        """Retrieve all products with pagination"""
        products = self.db_session.query(Product).offset((page-1)*per_page).limit(per_page).all()
        return [product.to_dict() for product in products]

    def get_product_by_id(self, product_id):
        """Retrieve a single product by ID"""
        product = self.db_session.query(Product).filter(Product.id == product_id).first()
        return product.to_dict() if product else None

    def create_product(self, product_data):
        """Create a new product"""
        new_product = Product(**product_data)
        self.db_session.add(new_product)
        self.db_session.commit()
        return new_product.to_dict()

    def update_product(self, product_id, product_data):
        """Update an existing product"""
        product = self.db_session.query(Product).filter(Product.id == product_id).first()
        if product:
            for key, value in product_data.items():
                setattr(product, key, value)
            self.db_session.commit()
            return product.to_dict()
        return None

    def delete_product(self, product_id):
        """Delete a product"""
        product = self.db_session.query(Product).filter(Product.id == product_id).first()
        if product:
            self.db_session.delete(product)
            self.db_session.commit()
            return True
        return False
