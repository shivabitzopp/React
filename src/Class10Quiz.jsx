import React, { useState, useEffect } from "react";
import "./Class9Quiz.css";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate, Navigate } from "react-router-dom";

function Class10Quiz() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [answers, setAnswers] = useState({});
  const [draggedOption, setDraggedOption] = useState(null);
  // const [lastOptionDragged, setLastOptionDragged] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const storageKey = "answers";

  const validateToken = async (token) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/validate-token/",
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return true;
      } else {
        logoutUser();
        return false;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      logoutUser();
      return false;
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    <Navigate to="/login" />;
  };

  const getData = async () => {
    validateToken(localStorage.getItem("token"));
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/practiceexams/class10"
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    const storedAnswersString = localStorage.getItem(storageKey);
    if (storedAnswersString) {
      const storedAnswers = JSON.parse(storedAnswersString);
      setAnswers(storedAnswers);
    }
  }, []);
  const handleOptionDrop = (event) => {
    event.preventDefault();
    if (draggedOption) {
      const questionId = data[id].id;
      const isImageOption = draggedOption.hasOwnProperty("image_url");

      if (isImageOption) {
        const correctImageURLs = data[id].options
          .filter((option) => option.image_url)
          .map((option) => option.image_url);

        if (correctImageURLs.includes(draggedOption.image_url)) {
          console.log("Correct option dragged!");
          setAnswers({
            ...answers,
            [questionId]: [draggedOption.image_url],
          });
        } else {
          
          setAnswers({
            ...answers,
            [questionId]: [],
          });
        }
      } else {
        setAnswers({
          ...answers,
          [questionId]: [draggedOption.text],
        });
      }

      setInputValue("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    validateToken(localStorage.getItem("token"));

    setAnswers({
      ...answers,
      [data[id].id]: inputValue || draggedOption || [],
    });
    const allAnswers = data.reduce((acc, question) => {
      const questionId = question.id;
      acc[questionId] = answers[questionId] || "";
      return acc;
    }, {});

    const data1 = {
      allAnswers: allAnswers,
      username: localStorage.getItem("username"),
    };

    console.log("Answers before sending:", allAnswers);
    axios
      .post("http://127.0.0.1:8000/practiceexams/class9Validation/", data1)
      .then((response) => {
        console.log("Data from the backend:", response.data);
        localStorage.removeItem("answers");
        navigate("/results");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const moveToNextQuestion = () => {
    if (id + 1 < data.length) {
      setId(id + 1);
      setDraggedOption(null);
      setInputValue("");
    } else {
      handleFormSubmit();
    }
  };
  const handleOptionDragStart = (event, option) => {
    setDraggedOption(option);
  };

  const handleOptionDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: "30px" }}>
        {data.length > 0 ? (
          <>
            <h2>
              <span>{data[id].id}. </span>
              {data[id].question}
            </h2>
            {data[id].options.some((option) => option.image_url) ? (
              <ul>
                {data[id].options.map((option, index) => (
                  <li
                    key={option.image_url || option.text}
                    draggable
                    onDragStart={(e) => handleOptionDragStart(e, option)}
                  >
                    {option.image_url ? (
                      <img src={option.image_url} alt={option.image_url} />
                    ) : (
                      option.text
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {data[id].options.map((option, index) => (
                  <li
                    key={option.text}
                    draggable
                    onDragStart={(e) => handleOptionDragStart(e, option)}
                  >
                    {option.text}
                  </li>
                ))}
              </ul>
            )}
            {/* <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onDrop={handleOptionDrop}
              onDragOver={handleOptionDragOver}
              placeholder={`${
                Array.isArray(answers[data[id]?.id])
                  ? answers[data[id]?.id].join(", ")
                  : ""
              }`}
            /> */}
            <div
              className="drop-area"
              onDrop={handleOptionDrop}
              onDragOver={handleOptionDragOver}
            >
              <p className="drop-text">Drag options here</p>
            </div>
            {" "}
            <button
              onClick={() => setId(id - 1)}
              style={{
                display: 0 === id ? "none" : "inline-flex",
              }}
              type="button"
              className="btn btn-secondary"
            >
              Previous
            </button>{" "}
            {data.length - 1 !== id && (
              <button
                onClick={() => moveToNextQuestion()}
                type="button"
                className="btn btn-dark"
              >
                Next
              </button>
            )}
            <button
              onClick={handleFormSubmit}
              style={{
                display: data.length - 1 === id ? "block" : "none",
              }}
              type="button"
              className="btn btn-primary"
            >
              Submit
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
export default Class10Quiz;