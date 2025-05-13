import React from "react";

const RecommendedTopics = () => {
  const topics = [
    "Economy",
    "Lifehacks",
    "Focus",
    "Adhd",
    "Productivity",
    "Concentration",
    "Graphic Design",
    "Genai",
    "Ui Ux Design",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",];

  return (
    <div className="my-4">
      <h4 className="fs-5 fw-bold">Recommended topics</h4>
      <div className="d-flex flex-wrap mt-3" style={{ gap: "10px" }}>
        {topics.map((topic, index) => (
          <span
            key={index}
            className="badge bg-light text-dark py-2 px-3 fs-7 border rounded-pill"
            style={{
            }}
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTopics;
