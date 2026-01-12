import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { dataHomePageStocks } from "@/shared/data/data-home-page-stocks";
import { Benefits } from "@/widgets/benefits-grid";
import { FeedbackForm } from "@/features/feedback-form";
import { StocksDetailsTop } from "@/widgets/stock-details/ui/stocks-details-top";
import { StocksDetailsBottom } from "@/widgets/stock-details/ui/stocks-details-bottom";
import { StocksDetailsDescription } from "@/widgets/stock-details/ui/stocks-details-description";


const StocksDetails = () => {
    const navigate = useNavigate();
    const { title } = useParams();
    const [showText, setShowText] = useState(false);
    
    const showTextClick = (elem) => {
        elem.showMore = !elem.showMore;
        setShowText(!showText);
    };

    const classData = dataHomePageStocks.find(element => element.title === title);

    if (!classData) {
        return <div>Товар не найден</div>;
    }

    const { id, image, name, imageTwo, point, description, showMore } = classData;

    return (
        <div className="detailed-stock">
            <div key={id} className="stocks-column">
                <StocksDetailsTop image={image} name={name}  />
           
                <StocksDetailsBottom 
                    imageTwo={imageTwo} 
                    name={name} 
                    point={point} 
                />
                <hr className="horizontal-line" />
                <div className="stock-description column">
                    <StocksDetailsDescription 
                        description={description} 
                        showMore={showMore} 
                        showTextClick={() => showTextClick(classData)} 
                    /> 
                    <button className="cta low" onClick={() => navigate(-1)}>
                     Вернуться назад
                    </button>
                </div>
                <Benefits />
                <FeedbackForm />
            </div>
        </div>
    );
};

export default StocksDetails;