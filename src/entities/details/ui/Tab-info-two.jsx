export const TabInfoTwo = ({ 
    brand, 
    productType, 
    productWidth, 
    productHeight, 
    productThickness,
    category,
    applying
}) => {
    return (
        <div className="detailedItem-list">
            <h3>Характеристики</h3>
            <br />
            <div className="item-list">

    

                {brand && (
                    <div className="list-left">
                        <p className="list-title">Бренд: </p>
                        <p className="list-description">{brand}</p>
                    </div>
                )}
                
                {productType && (
                    <div className="list-left">
                        <p className="list-title">Тип товара: </p>
                        <p className="list-description">{productType}</p>
                    </div>
                )}
                
                {category && (
                    <div className="list-left">
                        <p className="list-title">Категория: </p>
                        <p className="list-description">{category}</p>
                    </div>
                )}

                {applying && (
                    <div className="list-left">
                        <p className="list-title">Применение: </p>
                        <p className="list-description">{applying}</p>
                    </div>
                )}
    
    
                
                {productWidth && (
                    <div className="list-left">
                        <p className="list-title">Ширина: </p>
                        <p className="list-description">{productWidth} мм</p>
                    </div>
                )}
                
                {productHeight && (
                    <div className="list-left">
                        <p className="list-title">Высота: </p>
                        <p className="list-description">{productHeight} мм</p>
                    </div>
                )}
                
                {productThickness && (
                    <div className="list-left">
                        <p className="list-title">Толщина: </p>
                        <p className="list-description">{productThickness} мм</p>
                    </div>
                )}
            </div>
        </div>
    );
};