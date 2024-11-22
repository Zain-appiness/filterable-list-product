import './App.css';
import { useState } from 'react';

export function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      );
    }

    // Add product row
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  // Display "No such item" message if no products match
  if (rows.length === 0) {
    return <div className="no-items">No such item found.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>NAME</th>
          <th>PRICE</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
}

export function FilterProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className="container">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

export function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

export function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

export default function App() {
  const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1.5", stocked: true, name: "Banana" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$3", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Carrot" },
    { category: "Snacks", price: "$1", stocked: true, name: "Chips" },
    { category: "Snacks", price: "$1.5", stocked: false, name: "Cookies" },
    { category: "Drinks", price: "$3", stocked: true, name: "Water Bottle" },
    { category: "Drinks", price: "$5", stocked: true, name: "Orange Juice" },
    { category: "Drinks", price: "$2", stocked: false, name: "Soda" },
    { category: "Fruits", price: "$1", stocked: true, name: "Mango" },
    { category: "Vegetables", price: "$2.5", stocked: true, name: "Broccoli" },
    { category: "Vegetables", price: "$3.5", stocked: true, name: "Lettuce" },
    { category: "Fruits", price: "$1.8", stocked: true, name: "Peach" },
    { category: "Fruits", price: "$2.5", stocked: true, name: "Pineapple" },
    { category: "Vegetables", price: "$1.2", stocked: false, name: "Onion" },
    { category: "Vegetables", price: "$2.8", stocked: true, name: "Cabbage" },
    { category: "Snacks", price: "$3", stocked: false, name: "Nachos" },
    { category: "Snacks", price: "$2.5", stocked: true, name: "Popcorn" },
    { category: "Drinks", price: "$6", stocked: true, name: "Green Tea" },
    { category: "Drinks", price: "$3.2", stocked: false, name: "Lemonade" },
    { category: "Fruits", price: "$2.3", stocked: true, name: "Strawberries" },
    { category: "Snacks", price: "$4", stocked: true, name: "Granola Bar" },
];


  return <FilterProductTable products={PRODUCTS} />;
}
