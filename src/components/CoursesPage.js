import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import courseStore from "../stores/CourseStore";
import CourseList from "./CourseList";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(courseStore.getCourses());
  }, []);

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
