import React from 'react';
import axios from 'axios';

function ProductList({ products, onUpdated, onDeleted }) {
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    onDeleted();
  };

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} ({p.category}) - Stock: {p.stock} - 💵 {p.price}
            <button onClick={() => deleteProduct(p._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
