import React, { Component } from "react";
import { getCourses } from "../api/courseApi";

class CoursesPage extends Component {
  state = {
    courses: []
  };

  render() {
    return (
      <div>
        <h2>Courses</h2>
        <ul>
          {this.state.courses.map(course => {
            return <li>{course.title}</li>;
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    getCourses().then(courses => {
      this.setState({
        courses: courses
      });
    });
  }
}

export default CoursesPage;
