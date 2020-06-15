import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";

const ManageCoursePage = props => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  function handleFormChange(event) {
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value
    };
    setCourse(updatedCourse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    courseApi.saveCourse(course);
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />
      {props.match.params.slug}
    </>
  );
};

export default ManageCoursePage;
