import { React, useEffect, useRef, useState } from "react";
import { dataHomePageStocks } from "@/shared/data/data-home-page-stocks";
import { StockFilter } from "@/features/stock-filtering";
import { StocksInfo } from "@/widgets/stocks-grid";
import { FeedbackForm } from "@/features/feedback-form";
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Stocks = () => {
    const [stocks, setStocks] = useState(dataHomePageStocks);

    const filterStocks = (searchTerm) => {
        const chosenStock = dataHomePageStocks.filter(item => item.searchTerm === searchTerm);
        setStocks(chosenStock);
    }

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
            })
        })
    }, [])

    const addtoRefs = (el) => {
        if (el && !ref.current.includes(el)) {
            ref.current.push(el);
        }
    }

    return(
        <div className="all-stocks">
            <section>
                <div className="column">
                    <h4 className="white" ref={addtoRefs}>Лучший ассортимент <span className="outlined">для вас</span></h4>
                    <p className="description" ref={addtoRefs}>
                        Более <span className="orange">12 категорий</span> товаров! Опытные специалисты покажут, расскажут и помогут Вам сделать оптимальный выбор.
                    </p>
                </div>
                <StockFilter filterStocks={filterStocks} setStocks={setStocks} dataHomePageStocks={dataHomePageStocks} />
                <StocksInfo stocks={stocks} />
            </section>
            <FeedbackForm />
        </div>
    )
}

export default Stocks;