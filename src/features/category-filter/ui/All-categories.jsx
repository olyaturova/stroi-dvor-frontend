import { Filter } from "./filter";

export const AllCategories = () => {
    const categories = ['Все категории', 
        'Стеновые и фасадные материалы', 
        'Кровля и водосточная система', 
        'Цемент и сыпучие материалы', 
        'Пиломатериалы и отделка деревом', 
        'Электрика', 
        'Канализация и водоотведение', 
        'Поликарбонат', 
        'Краски', 
        'Пена монтажная, жидкие гвозди', 
        'Сантехника', 'Кирпич', 
        'Погонажные изделия'];
    
    return (
        <div className="stocksBtnGroup">
            {categories.map((category, index) => 
                <Filter category={category} key={index}/>
            )}
        </div>
    );
};