import { useDispatch } from "react-redux";
import { removeItemFromCart, incrementCartItemQuantity, decrementCartItemQuantity } from "../../../entities/cart/lib/cart-slice";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiPlusLight } from "react-icons/pi";
import { PiMinusLight } from "react-icons/pi";

export const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();

    const addQuantity = () => {
        dispatch(incrementCartItemQuantity({ productId: cartItem.productId }));
    };
    
    const removeQuantity = () => {
        dispatch(decrementCartItemQuantity({ productId: cartItem.productId }));
    };

    return(
        <div className="flex">
            <div className="itemPhotoInCart">
            <img className="item-image" src={cartItem.productImg} alt="item" />
            </div>
            <div className="itemInCart column-left">
                <div className="flex-relative">
                    <p className="itemNameInCart">{ cartItem.productName }</p>
                    <span onClick={() => dispatch(removeItemFromCart({cartItemId: cartItem.id}))}>
                    <FaRegTrashAlt className="trash-bin"/>
                    </span>
                </div>
                <div className="flex">
                    <button className="addDeleteBtn" onClick={removeQuantity}><PiMinusLight className="minus"/></button>
                    <span className="addedQuantity">{cartItem.quantity}</span>
                    <button className="addDeleteBtn" onClick={addQuantity}><PiPlusLight /></button>
                </div>
                <p className="items-number">{ cartItem.quantity } </p>
                <p className="itemTotalPrice">{+(cartItem.productPrice * cartItem.quantity).toFixed(2)} руб.</p>
            </div>
        </div>
    )
}

export default CartItem;