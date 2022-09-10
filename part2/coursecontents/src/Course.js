import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  );
};

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part, i) => (
      <Part key={i} part={part.name} exercises={part.exercises} />
    ))}
  </div>
);

const Course = ({ course }) => {
  return (
    <div>
      {course.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
