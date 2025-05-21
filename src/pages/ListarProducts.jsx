// ProductList.jsx
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = ({ apiEndpoint }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiEndpoint]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Product List</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-6 col-sm-6 col-md-3 mb-4">
            <div className="card h-100">
              <img src={product.image} alt={product.title} className="card-img-top mx-auto"
                style={{ height: '150px', width: 'auto', objectFit: 'contain', padding: '10px' }} />
              <div className="card-body p-2">
                <h6 className="card-title" style={{ fontSize: '0.9rem' }}>{product.title}</h6>
                <p className="card-text text-primary mb-0" style={{ fontWeight: 'bold' }}>${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
