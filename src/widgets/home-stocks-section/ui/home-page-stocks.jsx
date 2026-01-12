import { Link } from "react-router-dom";
import { HomePageStocksCarousel } from "../../home-stocks-carousel";

export const HomePageStocks = () => {
    return(
        <section className="homePageStocks start-column">
            <h4 className="section-headings">Строительные и <span className="outlined">отделочные материалы</span></h4>
            <p className="description">
                Любая предлагаемая нами продукция будет иметь
                <span className="orange"> достойное качество и привлекательную цену.</span> Ассортимент товаров давно вышел за рамки стройматериалов и постоянно расширяется.
            </p>
              <HomePageStocksCarousel />
            <button className="cta learn-more center-btn">
                <Link to="/stocks" className="text-light">Больше информации</Link>
            </button>
           
        </section>
    )
}