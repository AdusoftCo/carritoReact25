// CrudProductos.jsx

import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'https://685d4c80769de2bf08602010.mockapi.io/api/v11/products';

const CrudProductos = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', stock: '', image: '' });
  const [editId, setEditId] = useState(null);

  const getProductos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProductos(data);
  };

  const handleClose = () => {
    setShow(false);
    setForm({ title: '', description: '', price: '', stock: '', image: '' });
    setEditId(null);
  };

  const handleShow = (producto) => {
    setShow(true);
    if (producto) {
      setForm({
        ...producto,
        price: Number(producto.price),
        stock: Number(producto.stock)
      });
      setEditId(producto.id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
     
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
     
        // Optionally, you can parse the response if needed
        const data = await response.json();
        console.log('Product updated:', data); // Log the updated product
        handleClose();
        getProductos(); // Refresh the product list
    
        } catch (error) {
            console.error('Failed to save product:', error);
    }
    
};

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      getProductos();
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div class="flex flex-col items-center">
        <h2 class="mb-4 text-center">Emakick's Store</h2>
        <div className="w-full flex justify-start">
            <Button
                variant="success"
                className="rounded-pill mb-5 px-3 py-1 text-sm"
                style={{ width: 'auto', display: 'inline-block' }}
                onClick={() => handleShow()}
            >
                Agrega Producto
            </Button>
        </div>
        
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.title}</td>
              <td>{prod.description}</td>
              <td>${Number(prod.price).toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>
                {prod.image?.startsWith('http') ? (
                  <img src={prod.image} alt={prod.title} width={50} />
                ) : (
                  <span>{prod.image}</span>
                )}
              </td>
              
              <td>
                <Button
                    size="sm"
                    variant="link"
                    className="no-hover-bg-blue"
                    onClick={() => handleShow(prod)}
                >Editar</Button>{' '}
                
                <Button
                    size="sm"
                    variant="link"
                    className="no-hover-bg-red"
                    onClick={() => eliminarProducto(prod.id)}
                >Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Editar' : 'Agregar'} Producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Título</Form.Label>
              <Form.Control
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" className="rounded-pill mt-2">Guardar</Button>
          </Form>
        </Modal.Body>
        
      </Modal>
    </div>
  );
};

export default CrudProductos;
