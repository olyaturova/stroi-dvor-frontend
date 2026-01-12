import { getCartItems, getTotalPrice, clearCart } from "../../../entities/cart/lib/cart-slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { VscClose } from "react-icons/vsc";
import CartItem from "./cart-item";

export const Cart = ({active, setActive}) => {
    const cartItems = useSelector(getCartItems);
    const totalPrice = useSelector(getTotalPrice);
    const dispatch = useDispatch();

    const toggleCart = () => {
        setActive(!active);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return(
        <div className="start-column">
            <div className="cart-topLine flex-relative">
            <p className="cart-top">Корзина покупок</p>
            <VscClose className="closeCart-icon" onClick={toggleCart} />
            </div>
            {cartItems.length === 0 ? (
                <div className="start-column">
                    <p className="empty-cart">Ваша корзина пуста</p>
                </div>
            ) : (
            <div>
            <div className="all-cartItems">
            {cartItems.map(cartItem => <CartItem cartItem = {cartItem} key={cartItem.id} />)}
            </div>
            <div className="cart-topLine start-column">
            <p className="total-price">Сумма: { totalPrice } руб.</p>
            <p onClick={handleClearCart} className="clear-cart">Очистить корзину</p>
            </div>
            </div>
            )}

        </div>
    )
}

