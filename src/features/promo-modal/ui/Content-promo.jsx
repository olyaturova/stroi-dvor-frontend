import promoOne from "@/shared/assets/promos/drop.png";
import snow from "@/shared/assets/promos/snow.png";
import { VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";

export const ContentPromo = ({ setModalPromoOpen }) => {
    return (
        <div className="modal_content">
            <VscClose className="closeModalBtn" onClick={() => setModalPromoOpen(false)} />
            <img src={snow} alt="flower" className="snow" />
            <img src={snow} alt="flower" className="snowTwo" />
            <img src={snow} alt="flower" className="snowFive" />
            <p className="modal-heading">Зимняя акция</p>
            <p className="modal-text">-21% на строительные материалы.</p>
            <p className="modal-text">* скидка действует до конца февраля.</p>
            <img src={promoOne} alt="promo" className="promo-photo" />
            <button className="modal-cta" onClick={() => setModalPromoOpen(false)}>
                <Link to="/promos" className="promos-link text-light">Другие скидки</Link>
            </button>
        </div>
    );
};