const SUPERMARKET_DATA = [
  {
    item_name: "Apple",
    item_price: 50,
    item_unit: "Kg",
    item_subCategory: "Fruits",
    item_category: "Produce",
    item_discount: 0,
    is_percent_discount: false,
    subCategory_discount: 18,
    category_discount: 10,
    buy: 3,
    free: 1,
    final_discount: 0,
  },
  {
    item_name: "Orange",
    item_price: 80,
    item_unit: "Kg",
    item_subCategory: "Fruits",
    item_category: "Produce",
    item_discount: 20,
    is_percent_discount: true,
    subCategory_discount: 18,
    category_discount: 10,
    buy: 3,
    free: 1,
    final_discount: 0,
  },
  {
    item_name: "Potato",
    item_price: 30,
    item_unit: "Kg",
    item_subCategory: "Veg",
    item_category: "Produce",
    item_discount: 0,
    is_percent_discount: false,
    subCategory_discount: 5,
    category_discount: 10,
    buy: 5,
    free: 2,
    final_discount: 0,
  },
  {
    item_name: "Tomato",
    item_price: 70,
    item_unit: "Kg",
    item_subCategory: "Veg",
    item_category: "Produce",
    item_discount: 10,
    is_percent_discount: true,
    subCategory_discount: 5,
    category_discount: 10,
    buy: 0,
    free: 0,
    final_discount: 0,
  },
  {
    item_name: "Cow Milk",
    item_price: 50,
    item_unit: "lt",
    item_subCategory: "Milk",
    item_category: "Dairy",
    item_discount: 0,
    is_percent_discount: false,
    subCategory_discount: 20,
    category_discount: 15,
    buy: 3,
    free: 1,
    final_discount: 0,
  },
  {
    item_name: "Soy Milk",
    item_price: 40,
    item_unit: "lt",
    item_subCategory: "Milk",
    item_category: "Dairy",
    item_discount: 10,
    is_percent_discount: true,
    subCategory_discount: 20,
    category_discount: 15,
    buy: 0,
    free: 0,
    final_discount: 0,
  },
  {
    item_name: "Cheddar",
    item_price: 50,
    item_unit: "Kg",
    item_subCategory: "Cheese",
    item_category: "Dairy",
    item_discount: 0,
    is_percent_discount: false,
    subCategory_discount: 20,
    category_discount: 15,
    buy: 2,
    free: 1,
    final_discount: 0,
  },
  {
    item_name: "Gouda",
    item_price: 80,
    item_unit: "Kg",
    item_subCategory: "Cheese",
    item_category: "Dairy",
    item_discount: 10,
    is_percent_discount: true,
    subCategory_discount: 20,
    category_discount: 15,
    buy: 0,
    free: 0,
    final_discount: 0,
  },
];

export default function SupermarketData() {
  let newData = [...SUPERMARKET_DATA];

  function calculateFinalDiscount() {
    newData.forEach((data) => {
      if (data.is_percent_discount) {
        if (
          data.item_discount > data.category_discount &&
          data.item_discount > data.subCategory_discount
        ) {
          return (data.final_discount = data.item_discount);
        } else if (data.subCategory_discount > data.category_discount) {
          return (data.final_discount = data.subCategory_discount);
        } else {
          return (data.final_discount = data.category_discount);
        }
      }
      return;
    });
  }

  calculateFinalDiscount();

  return newData;
}
