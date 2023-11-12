import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './catalog.css';
import CatalogFilter from '../CatalogFilter/catalogFilter';
import lamps from '../LampData/lampData';

function Catalog({ searchTerm, sortOption, lampId, lampPrice }) {
  const [sort, setSort] = useState(sortOption);
  const [id, setId] = useState(lampId);
  const [price, setPrice] = useState(lampPrice);

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(parseInt(event.target.value, 10));
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
  };

  let filteredLamps = lamps.filter((lamp) => lamp.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (sort === 'sortByPrice') {
    filteredLamps.sort((a, b) => a.price - b.price);
  } else if (sort === 'sortByTitle') {
    filteredLamps.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (id) {
    filteredLamps = filteredLamps.filter((lamp) => lamp.id === id);
  }

  if (price) {
    filteredLamps = filteredLamps.filter((lamp) => {
      const lampPrice = parseInt(lamp.price, 10);
  
      if (price === '1000+') {
        return lampPrice > 1000;
      } else if (price === '501-1000') {
        return lampPrice >= 501 && lampPrice <= 1000;
      } else if (price === '1001-2000') {
        return lampPrice >= 1001 && lampPrice <= 2000;
      } else {
        return lampPrice <= parseInt(price, 10);
      }
    });
  }
  
  

  return (
    <>
      <CatalogFilter onSortChange={handleSortChange} onIdChange={handleIdChange} onPriceChange={handlePriceChange} onSubmit={handleApplyFilters} />
      <div className="catalog">
        {filteredLamps.map((lamp) => (
          <div key={lamp.id} className="lamp">
            <img src={lamp.image} alt={lamp.title} width="300" height="250"/>
            <h3>{lamp.title}</h3>
            <p>{lamp.description}</p>
            <p><span style={{ fontWeight: 'bold' }}>Price:</span> {lamp.price} uah</p>
            <Link to={`/lamp/${lamp.id}`} className="lamp-link">View more</Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Catalog;
