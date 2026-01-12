import { React, useEffect, useRef } from "react";
import { ChangeQuantity } from "@/shared/ui/change-quantity";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, incrementCartItemQuantity, getCartItems } from "@/entities/cart/lib/cart-slice";
import { TbShoppingBagPlus } from "react-icons/tb";
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ShopItemDetailsInfo = ({ 
    image, 
    name, 
    price, 
    quantity, 
    setQuantity, 
    product 
}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(getCartItems);
    
    const productId = product?._id || product?.id;
 
    const productInCart = cartItems.some(cartItem => 
        cartItem.productId === productId || 
        cartItem.productId === product?._id || 
        cartItem.productId === product?.id
    );

    const handleClick = () => {
        if (!productId) {
            console.error("Product ID is undefined", product);
            return;
        }
        
        if (productInCart) {

            dispatch(incrementCartItemQuantity({
                productId: productId,
                quantity: quantity,
            }));
        } else {
 
            dispatch(addItemToCart({ 
                product: {
                    ...product,
                    id: productId,
                    _id: product?._id 
                }, 
                quantity: quantity 
            }));
        }
    };

    const ref = useRef([]);
    ref.current = [];

    useEffect(() => {
        ref.current.forEach((el) => {
            gsap.fromTo(el, { y: 50, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.7, scrollTrigger: {
                    trigger: el,
                    start: "top bottom-=70",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, []);

    const addtoRefs = (el) => {
        if (el && !ref.current.includes(el)) {
            ref.current.push(el);
        }
    };

    // Форматирование цены
    const formatPrice = (price) => {
        if (!price && price !== 0) return "Цена не указана";
        return new Intl.NumberFormat('ru-RU').format(price) + " руб.";
    };

    // Обработчик ошибки изображения
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = '/src/shared/assets/shop/default-product.jpg';
    };

    return(
        <div className="detailedItmes-heading">
            <div className="column realtive" ref={addtoRefs}>
                <img 
                    className="itemImage-detailed" 
                    src={image || '/src/shared/assets/shop/default-product.jpg'} 
                    alt={name || "Товар"} 
                    onError={handleImageError}
                />
                <div className="new">
                    <p className="new-sign">Участвует в акции</p>
                </div>
            </div>
            <div className="column-left">
                <p className="detailedItem-name" ref={addtoRefs}>
                    {name || product?.name || "Название товара не указано"}
                </p>
                <p className="detailedItem-price" ref={addtoRefs}>
                    {formatPrice(price)}
                </p>
                <div className="addedItems" ref={addtoRefs}>
                    <ChangeQuantity quantity={quantity} setQuantity={setQuantity}/>
                </div>
                <div>
                    <button 
                        className="cta flex-center" 
                        onClick={handleClick}
                        disabled={!productId}
                    >
                        <TbShoppingBagPlus className="shoppingBag-icon" /> 
                        {productInCart ? "Добавить еще" : "Добавить в корзину"}
                    </button>
                    {!productId && (
                        <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                            Ошибка: ID товара не определен
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};