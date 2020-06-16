import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import courseStore from "../stores/CourseStore";
import CourseList from "./CourseList";
import { loadCourses } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) {
      loadCourses();
      return () => courseStore.removeChangeListener(onChange); //cleanup on unmonut
    }
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  return (
    <div>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add course
      </Link>
      <CourseList courses={courses} />
    </div>
  );
}

export default CoursesPage;
