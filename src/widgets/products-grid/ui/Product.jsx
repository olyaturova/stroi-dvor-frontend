import { Link } from "react-router-dom";
import { useState } from "react";

export const Product = ({ product }) => {
    const [imageError, setImageError] = useState(false);
    
    const productId = product._id || product.id;
    
    const getImageUrl = () => {
        if (imageError) {
            return '/placeholder.jpg';
        }
        
        if (product.imageUrl) {
            return product.imageUrl;
        }
        
        if (product.image && product.image.startsWith('http')) {
            return product.image;
        }

        if (product.image) {
            return `https://stroi-dvor-backend.onrender.com/uploads/${product.image}`;
        }
        
        return '/placeholder.jpg';
    };
    
   
    const handleImageError = () => {
        console.error('❌ Не удалось загрузить изображение:', getImageUrl());
        setImageError(true);
    };
    
    return(
        <div className="product-card">
            <Link to={`/shop/${productId}`}>
                <div className="column item">
                    <img 
                        className="item-image" 
                        src={getImageUrl()}
                        alt={product.name || product.title}
                        onError={handleImageError}
                        loading="lazy"
                    />
                    <p className="item-price">{product.price} руб.</p>
                    <span className="item-name">{product.name || product.title}</span>
                </div>
            </Link>
        </div>
    );
};