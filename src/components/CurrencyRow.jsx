import React from "react";

const CurrencyRow = (props) => {
  return (
    <div class="col">
      <label for="name">{props.name}:</label>
      <select
        id="select"
        class="form-control"
        value={props.base}
        onChange={props.setBase}
      >
        {props.curencyValues.map((c) => {
          return (
            <option key={c} value={c}>
              {c}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const CustomInput = (props) => {
  function toFix(num) {
    return Math.ceil(num * 100) / 100;
  }
  return (
    <div class="col">
      <input
        id="result"
        type="number"
        class="form-control"
        onChange={props.onChange}
        value={toFix(props.amount)}
      />
    </div>
  );
};

export default CurrencyRow;
