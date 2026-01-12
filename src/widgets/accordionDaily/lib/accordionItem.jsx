import { useState } from "react";
import { SlPlus } from "react-icons/sl";
import { DailyStocks } from "@/shared/ui/daily-stocks/daily-stocks";

export const AccordionItem = ({title, stocks}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    return(<div>
        <div className={isOpen ? 'activeAccordion' : 'default'} onClick={handleIsOpen}>
            <p className="accordion-header">{title}</p>
            <SlPlus className="arrow"/>
        </div>
        <div className={isOpen ? 'content' : 'hidden'} onClick={handleIsOpen}>
        {
        Object.values(stocks)
            .map(({ name }, index) =>
                <DailyStocks key={index}
                    name={name} />
            )
        }
        </div>
    </div>)
}