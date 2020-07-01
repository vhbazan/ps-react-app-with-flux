import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        label="Title"
        id="title"
        name="title"
        value={props.course.title}
        onChange={props.onFormChange}
        error={props.errors.title}
      />

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
            id="author"
            name="authorId"
            onChange={props.onFormChange}
            value={props.course.authorId | ""}
            className="form-control"
          >
            <option value="" />
            {props.authors.map(author => {
              return (
                <option value={author.id} key={author.id}>
                  {author.name}
                </option>
              );
            })}
          </select>
        </div>
        {props.errors.authorId && (
          <div className="alert alert-danger">{props.errors.authorId}</div>
        )}
      </div>

      <TextInput
        label="Category"
        id="category"
        name="category"
        value={props.course.category}
        onChange={props.onFormChange}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

export default CourseForm;
