import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Card } from 'react-bootstrap'; // Import Card
// import './CrudProducts.css'; // Optional: if you create a dedicated CSS file

const API_URL = 'https://685d4c80769de2bf08602010.mockapi.io/api/v11/products';

const CrudProductos = () => {
    const [productos, setProductos] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', price: '', stock: '', image: '' });
    const [editId, setEditId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // State to track mobile view

    // Function to update isMobile state on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

            const data = await response.json();
            console.log('Product updated:', data);
            handleClose();
            getProductos();

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
        <div className="flex flex-col items-center p-3">
            <h2 className="mb-4 text-center">Emakick's Store</h2>
            <div className="w-full flex justify-start mb-3">
                <Button
                    variant="success"
                    className="rounded-pill px-3 py-1 text-sm"
                    style={{ width: 'auto', display: 'inline-block' }}
                    onClick={() => handleShow()}
                >
                    Agrega Producto
                </Button>
            </div>

            {/* --- Conditional Rendering based on isMobile --- */}

            {/* Desktop/Tablet View (Table) */}
            {!isMobile && (
                <Table striped bordered hover className="w-100"> {/* Added w-100 for Bootstrap width */}
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
                                        className="no-hover-bg-blue font-bold"
                                        onClick={() => handleShow(prod)}
                                        style={{
                                            color: '#007bff', textDecoration: 'none',
                                            '--bs-btn-hover-bg': 'transparent', '--bs-btn-active-bg': 'transparent',
                                            '--bs-btn-hover-color': '#007bff', '--bs-btn-active-color': '#007bff',
                                        }}
                                    >Editar</Button>{' '}
                                    <Button
                                        size="sm"
                                        variant="link"
                                        className="no-hover-bg-red"
                                        onClick={() => eliminarProducto(prod.id)}
                                        style={{
                                            color: '#dc3545', textDecoration: 'none',
                                            '--bs-btn-hover-bg': 'transparent', '--bs-btn-active-bg': 'transparent',
                                            '--bs-btn-hover-color': '#dc3545', '--bs-btn-active-color': '#dc3545',
                                        }}
                                    >Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Mobile View (Cards) */}
            {isMobile && (
                <div className="d-flex flex-wrap justify-content-center gap-3"> {/* Bootstrap flexbox for cards */}
                    {productos.map(prod => (
                        <Card key={prod.id} style={{ width: '18rem' }}> {/* Card for each product */}
                            {prod.image?.startsWith('http') ? (
                                <Card.Img variant="top" src={prod.image} alt={prod.title} style={{ height: '180px', objectFit: 'contain' }} />
                            ) : (
                                <Card.Body className="text-center">No Image</Card.Body>
                            )}
                            <Card.Body>
                                <Card.Title>{prod.title}</Card.Title>
                                <Card.Text>
                                    
                                    <strong>Precio:</strong> ${Number(prod.price).toFixed(2)}<br/>
                                    <strong>Stock:</strong> {prod.stock}
                                </Card.Text>
                                <div className="d-flex justify-content-between"> {/* Buttons below data */}
                                    <Button
                                        size="sm"
                                        variant="link"
                                        className="no-hover-bg-blue font-bold"
                                        onClick={() => handleShow(prod)}
                                        style={{
                                            color: '#007bff', textDecoration: 'none',
                                            '--bs-btn-hover-bg': 'transparent', '--bs-btn-active-bg': 'transparent',
                                            '--bs-btn-hover-color': '#007bff', '--bs-btn-active-color': '#007bff',
                                        }}
                                    >Editar</Button>
                                    <Button
                                        size="sm"
                                        variant="link"
                                        className="no-hover-bg-red"
                                        onClick={() => eliminarProducto(prod.id)}
                                        style={{
                                            color: '#dc3545', textDecoration: 'none',
                                            '--bs-btn-hover-bg': 'transparent', '--bs-btn-active-bg': 'transparent',
                                            '--bs-btn-hover-color': '#dc3545', '--bs-btn-active-color': '#dc3545',
                                        }}
                                    >Eliminar
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}

            {/* ... (Modal code remains the same) ... */}
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
