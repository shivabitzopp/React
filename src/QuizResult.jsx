import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizResult = () => {
  const [results, setResults] = useState([]);

  const validateToken = (token) => {
    return axios
      .post("http://127.0.0.1:8000/validate-token/", null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return true;
        } else {
          logoutUser();
          return false;
        }
      })
      .catch((error) => {
        console.error("Error validating token:", error);
        logoutUser();
        return false;
      });
  };

  const logoutUser = () => {
  };

  const getResults = () => {
    const token = localStorage.getItem("token");
  
      
        axios
          .get("http://127.0.0.1:8000/api/get-results/")
          .then((response) => {
            setResults(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      
    
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>User History</h1>
      {results.map((result) => (
        <div key={result.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p>Exam ID: {result.exam_id}</p>
          <p>Email: {result.email}</p>
          <p>Question ID: {result.question_id}</p>
          <p>Answer: {result.answer}</p>
          {/* <p>Is Correct: {result.is_correct}</p> */}
          <p>TotalScore: {result.score}</p>
          <p>Attempted Date: {result.attempted_date}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizResult;
