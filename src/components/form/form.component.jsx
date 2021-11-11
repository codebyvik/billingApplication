import { useState } from "react";
import SupermarketData from "../../utilities/supermarketData";

import "./form.style.css";

export default function Form() {
  // All the data of superMarket is fetched and discount is calculated for each item
  const data = SupermarketData();

  // app state
  const [state, setState] = useState([
    {
      item_name: "",
      item_unit: "",
      item_quantity: "",
      buy: 0,
      free: 0,
      final_discount: 0,
      total_amount: 0,
      total_price: 0,
      item_price: 0,
      is_percent_discount: false,
    },
  ]);
  const [customerName, setCustomerName] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Update state when item is selected
  const handleInputChange = (idx, event) => {
    const { value } = event.target;
    let values = [...state];

    // Picking specific item  object from the state
    let item = data.find((d) => d.item_name === value);

    // updating values of item object
    values[idx] = {
      item_name: item.item_name,
      item_unit: item.item_unit,
      item_quantity: 1,
      buy: item.buy,
      free: item.free,
      final_discount: item.final_discount,
      item_price: item.item_price,
      is_percent_discount: item.is_percent_discount,
      total_price: item.item_price,
      total_amount:
        item.item_price - (item.final_discount / 100) * item.item_price,
    };

    // updating the state
    setState(values);
  };

  // update state when quantity is changed
  const handleQuantityChange = (idx, event) => {
    let values = [...state];

    // item object is stored in item variable
    let item = values[idx];

    // calculate payable amount for the item
    let amount =
      item.item_price * parseInt(event.target.value) -
      (item.final_discount / 100) *
        (item.item_price * parseInt(event.target.value));

    // calculate total price
    let totalPrice = item.item_price * parseInt(event.target.value);

    // update the item with quantity or fall back to 1 if the value 0 or less than 0
    values[idx].item_quantity = parseInt(event.target.value) || 1;

    // check if the item discount offer and update the price
    if (item.is_percent_discount || item.buy >= item.item_quantity) {
      values[idx].total_amount = parseInt(amount.toFixed(2));
      values[idx].total_price = totalPrice;
    } else {
      let discountItem = item.item_quantity / (item.buy + item.free);
      let billed_quantity = item.item_quantity - discountItem * item.free;
      values[idx].total_amount = billed_quantity.toFixed(2) * item.item_price;
      values[idx].total_price = item.item_price * item.item_quantity;
    }

    // Update the state
    setState(values);
  };

  // Add Input field
  const addNextField = (e) => {
    e.preventDefault();
    setState([
      ...state,
      {
        item_name: "",
        item_unit: "",
        item_quantity: "",
        buy: 0,
        free: 0,
        final_discount: 0,
        total_amount: 0,
        item_price: 0,
        is_percent_discount: false,
        total_price: 0,
      },
    ]);
  };

  // Remove input field
  const removeInputField = (e, idx) => {
    e.preventDefault();
    const value = state.filter((data, i) => i !== idx);
    setState(value);
  };

  // Calulate Total amount , total price and amount saved
  let totalAmountPayableArray = state.map((data) => data.total_amount);
  let totalPriceArray = state.map((data) => data.total_price);
  let TotalAmountPayable = totalAmountPayableArray.reduce(
    (prev, curr) => prev + curr
  );
  let totalPrice = totalPriceArray.reduce((prev, curr) => {
    return prev + curr;
  });
  let amountSaved = totalPrice - TotalAmountPayable;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
    setTimeout(() => {
      setShowPreview(false);
      window.location.reload();
    }, 15000);
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="customerName">Customer Name :</label>
        <input
          type="text"
          name="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="customerName"
          required
        />
        <br />
        <div className="form-header">
          <h3>Item</h3>
          <h3>Qty</h3>
          <h3>Price</h3>
          <h3>total price</h3>
        </div>
        <br />
        {state.map((object, idx) => {
          return (
            <div className="item" key={idx}>
              <select
                name="item_name"
                id=""
                onChange={(event) => handleInputChange(idx, event)}
                defaultValue="select"
              >
                <option value="select" disabled>
                  Select one
                </option>
                {data.map((d, idx) => (
                  <option key={idx} value={d.item_name}>
                    {d.item_name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="item_quantity"
                value={object.item_quantity}
                onChange={(event) => handleQuantityChange(idx, event)}
                disabled={!object.item_name}
              />

              <p>{`${object.item_price} / ${object.item_unit || "Na"}`}</p>

              <p>{object.total_amount}</p>

              <button
                onClick={(e) => removeInputField(e, idx)}
                disabled={idx === 0}
              >
                Delete
              </button>

              <button onClick={addNextField}>Add</button>
              <br />
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
      <h3>Total Price : {totalPrice}</h3>
      <h3>Total amount payable : {TotalAmountPayable}</h3>
      <h3>You saved {amountSaved.toFixed(2)}</h3>
      <br />
      <br />
      <br />
      {showPreview && (
        <>
          {" "}
          <h1>Preview</h1>
          <p>
            Customer Name : <b> {customerName}</b>{" "}
          </p>
          <table>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>total</th>
            </tr>
            {state.map((item, idx) => (
              <tr key={idx}>
                <td>{item.item_name}</td>
                <td>{item.item_quantity} </td>
                <td>{`${item.item_price}/ ${item.item_unit}`}</td>
                <td>{item.total_amount}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total Price : {totalPrice}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total paid : {TotalAmountPayable}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>You saved {amountSaved.toFixed(2)}</td>
            </tr>
          </table>
        </>
      )}
    </>
  );
}
