import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/CourseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";
import * as authorActions from "../actions/authorActions";
import authorStore from "../stores/AuthorStore";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug;
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      const tempCourse = courseStore.getCourseBySlug(slug);
      if (tempCourse) {
        setCourse(tempCourse);
      } else {
        props.history.push("/course/not-found");
      }
    }

    return () => courseStore.removeChangeListener(onChange);
  }, [props.history, courses.length, props.match.params.slug, authors]);

  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);

    if (authors.length === 0) {
      authorActions.loadAuthors();
    }
    return () => authorStore.removeChangeListener(onAuthorChange);
  }, [authors]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function onAuthorChange() {
    setAuthors(authorStore.getAuthors());
  }

  function handleFormChange(event) {
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value
    };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author iD is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      toast.success("Course saved.");
      props.history.push("/courses");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        authors={authors}
      />
    </>
  );
};

export default ManageCoursePage;
