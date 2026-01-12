import { dataAccordion } from "@/shared/data/dataAccordion";
import './accordion.css';
import { AccordionItem } from "./accordionItem";

export const AccordionDaily = () => {
    return (<div>
        {dataAccordion.map((item, id) => 
        <AccordionItem key={id}
        title={item.title}
        stocks={item.stocks}/>
        )}
    </div>)
}