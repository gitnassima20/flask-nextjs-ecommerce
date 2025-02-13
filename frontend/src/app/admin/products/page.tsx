'use client';

import ProductsTable from './ProductsTable';
import AddProduct from './AddProduct';

export default function AdminProductsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      
      {/* Add Product Form */}
      <AddProduct />

      {/* Products Table */}
      <ProductsTable />
    </div>
  );
}