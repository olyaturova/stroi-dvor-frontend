import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs } from "@/shared/ui/tabs";
import { ShopItemDetailsInfo } from "@/widgets/product-details";
import { TabInfoOne, TabInfoTwo } from "@/entities/details";
import axios from 'axios';

const API_URL = 'https://stroi-dvor-backend.onrender.com/';

const ShopItemDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`${API_URL}/api/shop/${id}`);

                const productData = response.data;
                if (productData && !productData.imageUrl && productData.image) {
                    productData.imageUrl = `${API_URL}/uploads/${productData.image}`;
                }
                
                setProduct(productData);
            } catch (err) {
                setError('Товар не найден');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="shopItem-container column">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Загрузка товара...</p>
                </div>
   
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="shopItem-container column">
                <div className="error-container">
                    <h2>Товар не найден</h2>
                    <p>Извините, запрошенный товар не существует или был удален.</p>
                    <button 
                        className="cta low" 
                        onClick={() => navigate('/shop')}
                    >
                        Вернуться в магазин
                    </button>
                </div>
          
            </div>
        );
    }

    const imageUrl = product.imageUrl || 
                    (product.image && `${API_URL}/uploads/${product.image}`);

    const { 
        price, 
        name, 
        applying, 
        fullDescription, 
        brand, 
        productType, 
        productWidth, 
        productHeight, 
        productThickness,
        title,
        category 
    } = product;

    return(
        <div>
            <section className="shopItem-container column">
                <div className="column-left black" key={product._id || product.id}>
                    <ShopItemDetailsInfo 
                        image={imageUrl} 
                        name={name} 
                        price={price} 
                        applying={applying} 
                        quantity={quantity} 
                        setQuantity={setQuantity} 
                        product={product} 
                    />
                    
                    <div className="item-tabs column-left">
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                        <hr className="hr-tabs" />
                        {activeTab === 0 && <TabInfoOne fullDescription={fullDescription} />} 
                        {activeTab === 1 && (
                            <TabInfoTwo 
                                brand={brand} 
                                productType={productType} 
                                productWidth={productWidth} 
                                productHeight={productHeight} 
                                productThickness={productThickness}
                                category={category}
                                title={title}
                                applying={applying} 
                            />
                        )}
                    </div> 
                    
                    <div className="column">
                        <button className="cta low" onClick={() => navigate(-1)}>
                            Вернуться назад
                        </button>
                    </div>
                </div>
            </section>
      
        </div>
    );
};

export default ShopItemDetails;