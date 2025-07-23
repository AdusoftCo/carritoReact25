// ProductCard.jsx

import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, agregarAlCarrito }) => {
  return (

    // Armo la cards
    <Card className="h-100 d-flex flex-column">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        className="card-img-top img-fluid mt-2" 
        style={{ height: '200px', objectFit: 'contain' }} 
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.description.slice(0, 100)}...
        </Card.Text>
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        
      </Card.Body>

      <Button className="mb-2" variant="primary" onClick={() => agregarAlCarrito(product)}>
          Agregar al carrito
      </Button>

    </Card>
  );
};

export default ProductCard;
