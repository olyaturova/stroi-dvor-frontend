import { React, useEffect, useRef, useState } from 'react';
import { Product } from "./Product";
import { useSelector } from "react-redux";
import { getSelectedCategory } from "@/entities/products-details-tab";
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const API_SHOP = 'https://stroi-dvor-backend.onrender.com/api/shop';

export const Products = () => {
    const selectedCategory = useSelector(getSelectedCategory);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ref = useRef();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(API_SHOP);
                setProducts(response.data);
            } catch (error) {
                setError('Не удалось загрузить товары. Проверьте подключение к серверу.');
     
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    useEffect(() => {
        const el = ref.current;
        if (el && products.length > 0) {
            gsap.fromTo(el, { y: 50, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.7, scrollTrigger: {
                    trigger: el,
                    start: "top bottom-=70",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }, [products]);


    const filteredProducts = products.filter(product => {
        if (selectedCategory === 'Все категории') return true;
        return selectedCategory === product.category;
    });

    if (loading) {
        return (
            <div className="flex-around wrap" ref={ref}>
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '50px'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '5px solid #f3f3f3',
                        borderTop: '5px solid #3498db',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <p>Загрузка товаров...</p>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-around wrap" ref={ref}>
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '50px',
                    background: '#f8f9fa',
                    borderRadius: '10px'
                }}>
                    <h3 style={{ color: '#e74c3c', marginBottom: '15px' }}>Ошибка загрузки</h3>
                    <p style={{ color: '#666', marginBottom: '25px' }}>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '10px 20px',
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Обновить страницу
                    </button>
                </div>
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="flex-around wrap" ref={ref}>
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '50px'
                }}>
                    <h3>Товары не найдены</h3>
                    <p>
                        {selectedCategory !== 'Все категории' 
                            ? `В категории "${selectedCategory}" пока нет товаров`
                            : 'На данный момент товары отсутствуют'
                        }
                    </p>
                </div>
            </div>
        );
    }

    return(
        <div className="flex-around wrap" ref={ref}>
            {filteredProducts.map(product =>
                <Product 
                    product={product} 
                    key={product._id || product.id}
                />
            )}
        </div>
    );
};