import React from "react";

function Dropdown(props) {
  return (
    <div className="form-group">
      <label htmlFor="author">{props.label}</label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          className="form-control"
        >
          <option value="" />
          {props.options.map(option => {
            return (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
      {props.error && props.error.authorId && (
        <div className="alert alert-danger">{props.errors.authorId}</div>
      )}
    </div>
  );
}

export default Dropdown;
