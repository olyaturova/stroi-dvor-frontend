import { dataHomePageStocks } from "@/shared/data/data-home-page-stocks";
import "./home-page-stocks-carousel.css";

export const HomePageStocksCarousel = () => {
    return(
        <section className="stocks-grid-section">
            <div className="stocks-grid">
                {dataHomePageStocks.map((item) => (
                    <div key={item.id} className="stock-card">
                        <div className="stock-image-container">
                            <img 
                                className="stock-image" 
                                src={item.image} 
                                alt={item.name}
                            />
                            <div className="stock-overlay">
                                <h3 className="stock-title">{item.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}