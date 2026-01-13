import { Link } from "react-router-dom";
import { useState } from "react";

const BASE_URL = 'https://stroi-dvor-backend.onrender.com';

export const Product = ({ product }) => {
    const [imageError, setImageError] = useState(false);
    
    const productId = product._id || product.id;
    
    const getImageUrl = () => {
        if (imageError) {
            return null; 
        }

        const imageSource = product.imageUrl || product.image;
        
        if (!imageSource) {
            return null; 
        }
        
        if (imageSource.includes('localhost:3001')) {
            return imageSource.replace(
                'http://localhost:3001/uploads/', 
                `${BASE_URL}/uploads/`
            );
        }
        
        if (imageSource.startsWith('http')) {
            return imageSource;
        }

        return `${BASE_URL}/uploads/${imageSource}`;
    };
    
    const imageUrl = getImageUrl();
    
    const handleImageError = () => {
        console.error('❌ Не удалось загрузить изображение:', imageUrl);
        console.log('Исходные данные продукта:', {
            image: product.image,
            imageUrl: product.imageUrl,
            name: product.name
        });
        setImageError(true);
    };
    
    return(
        <div className="product-card">
            <Link to={`/shop/${productId}`}>
                <div className="column item">
                    <div style={{
                        width: '100%',
                        height: '200px',
                        background: imageUrl && !imageError ? 'transparent' : '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        {imageUrl && !imageError ? (
                            <img 
                                className="item-image" 
                                src={imageUrl}
                                alt={product.name || product.title}
                                onError={handleImageError}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        ) : (
                            <span style={{ color: '#999', fontSize: '14px' }}>
                                {imageError ? 'Ошибка загрузки' : 'Нет изображения'}
                            </span>
                        )}
                    </div>
                    <p className="item-price">{product.price} руб.</p>
                    <span className="item-name">{product.name || product.title}</span>
                </div>
            </Link>
        </div>
    );
};