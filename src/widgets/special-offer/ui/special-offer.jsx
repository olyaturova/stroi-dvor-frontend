import { HashLink as Link } from 'react-router-hash-link';

export const SpecialOffer = () => {
    return(
        <div className="special-offer column">
            <div className="topPhoto-cover less column">
                <p className="offer-heading">
                    Выбирайте нас, и получите <span className="orange">специальное предложение.</span>
                </p>
                <p className="offer-subheading">
        Грамотные консультанты помогут Вам с поиском товара, оплатой и доставкой.</p>
                <button className="cta learn-more">
                    <Link smooth to="/#form" className="text-light">Узнать подробнее</Link>
                </button>
            </div>
        </div>
    )
}