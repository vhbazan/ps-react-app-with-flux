import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import courseStore from "../stores/CourseStore";
import CourseList from "./CourseList";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { loadAuthors } from "../actions/authorActions";
import authorStore from "../stores/AuthorStore";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) {
      loadCourses();
    } else if (authorStore.getAuthors().length === 0) {
      console.log("authoor", authorStore.getAuthors().length);
    }
    return () => {
      courseStore.removeChangeListener(onChange); //cleanup on unmonut
    };
  }, []);

  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);

    if (authorStore.getAuthors().length === 0) {
      loadAuthors();
    }
    return () => authorStore.removeChangeListener(onAuthorChange);
  }, [onAuthorChange]);

  function onChange() {
    console.log(courseStore.getCourses());
    setCourses(courseStore.getCourses());
  }

  function onAuthorChange() {
    console.log("onAuthorChange", authorStore.getAuthors());
    setAuthors(authorStore.getAuthors());
    if (
      authorStore.getAuthors().length !== 0 &&
      courseStore.getCourses().length !== 0
    ) {
      console.log("onAuthorChange - > all have values", authors);
      const tempCourses = courseStore.getCourses().map(course => {
        course.author = authors.find(author => course.authorId === author.id);
        return course;
      });
      console.log("after searching authors", tempCourses);
      setCourses(tempCourses);
    }
  }

  return (
    <div>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </div>
  );
}

export default CoursesPage;
