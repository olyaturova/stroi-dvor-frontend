import { PiPlusLight } from "react-icons/pi";
import { PiMinusLight } from "react-icons/pi";

const ChangeQuantity = ({quantity, setQuantity}) => {
    const addQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity)
    }

    const removeQuantity = () => {
        if (quantity <= 1) return;
        const newQuantity = quantity - 1;
        setQuantity(newQuantity)
    }

    return(
    <div className="addedItems">
        <button className="addDeleteBtn" onClick={removeQuantity}><PiMinusLight className="minus"/></button>
        <span className="addedQuantity">{quantity}</span>
        <button className="addDeleteBtn" onClick={addQuantity}><PiPlusLight /></button>
    </div>
    )
}

export default ChangeQuantity;