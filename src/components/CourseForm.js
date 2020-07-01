import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";
import Dropdown from "./common/Dropdown";

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

      <Dropdown
        label="Author"
        id="author"
        name="authorId"
        onChange={props.onFormChange}
        options={props.authors}
        value={props.course.authorId | ""}
        error={props.errors.author}
      />

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
