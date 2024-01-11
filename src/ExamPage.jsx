import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import React from 'react';

function ExamPage() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { exam_id } = useParams();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill("")
  );

  useEffect(() => {
    if (exam_id) {
      axios
        .get(`http://127.0.0.1:8000/api/get-exam-questions/${exam_id}/`)
        .then((response) => {
          const data = response.data.map((question, index) => ({
            ...question,
            uniqueId: `question_${index + 1}_${exam_id}`,
          }));
          console.log("Received data:", data);
          const initialAnswers = {};
          data.forEach((question) => {
            initialAnswers[question.uniqueId] = "";
          });
          setUserAnswers(initialAnswers);
          setQuestions(data);
          setSelectedOptions(Array(data.length).fill(""));
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [exam_id]);

  const renderOptions = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const hasMultipleCorrectAnswers = currentQuestion.correct_answer.length > 1;

    return (
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <label style={{ color: "#ff3333" }}>
              {hasMultipleCorrectAnswers ? (
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions[currentQuestionIndex].includes(
                    option
                  )}
                  onChange={() => handleCheckboxChange(option)}
                />
              ) : (
                <input
                  type="radio"
                  value={option}
                  checked={option === selectedOptions[currentQuestionIndex]}
                  onChange={() => handleOptionChange(option)}
                />
              )}
              {option}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  const handleOptionChange = (selectedOption) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    setUserAnswers((prevAnswers) => {
      const currentQuestionId = questions[currentQuestionIndex].uniqueId;
      const optionIndex =
        questions[currentQuestionIndex].options.indexOf(selectedOption);
      const mappedOption = alphabet.charAt(optionIndex);
      return { ...prevAnswers, [currentQuestionId]: mappedOption };
    });

    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[currentQuestionIndex] = selectedOption;
      return updatedOptions;
    });
  };

  const handleCheckboxChange = (selectedOption) => {
    const updatedOptions = [...selectedOptions];
    const currentOptions = updatedOptions[currentQuestionIndex];
  
    let updatedSelectedOptions;
  
    if (currentOptions.includes(selectedOption)) {
      updatedSelectedOptions = currentOptions.filter(
        (option) => option !== selectedOption
      );
    } else {
      updatedSelectedOptions = [...currentOptions, selectedOption];
    }
  
    updatedOptions[currentQuestionIndex] = updatedSelectedOptions;
    setSelectedOptions(updatedOptions);
  
    const currentQuestion = questions[currentQuestionIndex];
  
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const mappedOptions = updatedSelectedOptions.map((option) =>
      alphabet[currentQuestion.options.indexOf(option)]
    );
  
    const concatenatedOptions = mappedOptions.join(',');
    setUserAnswers((prevAnswers) => {
      const currentQuestionId = currentQuestion.uniqueId;
      return { ...prevAnswers, [currentQuestionId]: concatenatedOptions };
    });
  };
  
  
  
  
  

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting the exam!", userAnswers);
    // const userEmail = 'ka@gmail.com';
    const storedEmail = localStorage.getItem("email");
    console.log(storedEmail, "knljvn;lvjnsldvn");
    const formattedUserAnswers = {};
    Object.keys(userAnswers).forEach((key) => {
      const questionId = key.split("_")[1];
      formattedUserAnswers[questionId] = userAnswers[key];
    });

    axios
      .post("http://127.0.0.1:8000/api/validate-exam/", {
        examId: exam_id,
        userAnswers: formattedUserAnswers,
        email: storedEmail,
      })
      .then((response) => {
        console.log("Exam answers submitted successfully:", response.data);
        navigate("/results");
      })
      .catch((error) => {
        console.error("Error submitting exam answers:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ color: "#d24dff" }}>Exam Questions</h1>
      {questions.length === 0 ? (
        <p>No questions available for this exam.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div
            key={questions[currentQuestionIndex].question_id}
            style={{ marginBottom: "20px" }}
          >
            <p style={{ color: "green", fontWeight: "bold" }}>
              {questions[currentQuestionIndex].question_text}
            </p>
            {renderOptions()}
            <div>
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </button>
              {currentQuestionIndex === questions.length - 1 && (
                <button
                  type="submit"
                  style={{ backgroundColor: " #ff4da6", color: "white" }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ExamPage;
