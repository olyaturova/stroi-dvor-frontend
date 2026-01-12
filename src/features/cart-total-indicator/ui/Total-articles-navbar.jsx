import { useSelector } from "react-redux";
import { getTotalArticles } from "@/entities/cart/lib/cart-slice";

export const TotalArticlesNavbar = () => {
    const totalArticles = useSelector(getTotalArticles);

    return ( 
        <div className="quantity-container">
            <p className="quantity">{totalArticles}</p>
        </div>
    );
};