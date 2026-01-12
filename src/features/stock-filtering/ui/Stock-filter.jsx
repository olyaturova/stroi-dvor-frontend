import React from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown'; 
import { FaFilter } from "react-icons/fa";

export const StockFilter = ({ filterStocks, setStocks, dataHomePageStocks }) => {
  return (
    <Dropdown className="filter-stock">
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <FaFilter className="filter-icon"/> Выбрать товар
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item as="button" className="dropdown-item" onClick={() => setStocks(dataHomePageStocks)}>
          Смотреть все
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("building")}>
          Стеновые и фасадные материалы
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("roof")}>
          Кровля и водосточная система
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("cement")}>
          Цемент и сыпучие материалы
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("lumber")}>
          Пиломатериалы и отделка деревом
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("electrics")}>
          Электрика
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("sewage")}>
          Канализация и водоотведение
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("polycarbonate")}>
          Поликарбонат
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("paint")}>
          Краски
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("mounting-foam")}>
          Пена монтажная, жидкие гвозди
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("plumbing")}>
          Сантехника
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("kiln-brick")}>
          Кирпич
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => filterStocks("baseboard")}>
          Погонажные изделия
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}