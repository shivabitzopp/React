import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import { useParams } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)(({ theme }) => ({
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const PaddedTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: "100%",
}));

function AddQuestionPage() {
  const navigate = useNavigate();
  const { totalQuestions, exam_id } = useParams();
  const [examID, setExamID] = useState(exam_id);
  const maxIndex = parseInt(totalQuestions) - 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [examTitle, setExamTitle] = useState("");
  const [questions, setQuestions] = useState(
    Array.from({ length: parseInt(totalQuestions) }, () => ({}))
  );
  const [errorMessages, setErrorMessages] = useState(
    Array.from({ length: parseInt(totalQuestions) }, () => ({}))
  );
  const [viewDescriptions, setViewDescriptions] = useState(
    Array.from({ length: parseInt(totalQuestions) }, () => "")
  );
  
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const generateQuestionId = () => `${currentIndex + 1}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("http://127.0.0.1:8000/exam_definitions/");
        const filteredExam = resp.data.find(
          (item) => item.exam_id === parseInt(examID)
        );
        setExamTitle(filteredExam.exam_title);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [examID]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];

    if (name.startsWith("option")) {
      const optionIndex = parseInt(name.replace("option", ""), 10) - 1;
      updatedQuestions[index][name] = value;
      setQuestions(updatedQuestions);
    } else if (name === "correct_answer") {
      updatedQuestions[index][name] = value;
      setQuestions(updatedQuestions);
    } else if (name === "view_description") {
      const updatedViewDescriptions = [...viewDescriptions];
  updatedViewDescriptions[index] = value;
  setViewDescriptions(updatedViewDescriptions);
    } else {
      updatedQuestions[index][name] = value;
      setQuestions(updatedQuestions);

      const updatedErrors = [...errorMessages];
      updatedErrors[index][name] =
        value.trim() === "" ? `Field is required` : "";
      setErrorMessages(updatedErrors);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
      setShowPrevious(true);
      setShowNext(currentIndex + 1 !== maxIndex);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowNext(true);
      setShowPrevious(currentIndex - 1 !== 0);
    }
  };

  const validateInputs = () => {
    const errors = [];

    questions.forEach((question, index) => {
      const errorObj = {};

      if (!question.question_text || question.question_text.trim() === "") {
        errorObj.question_text = `Question text is required`;
      }
      if (!question.option1 || question.option1.trim() === "") {
        errorObj.option1 = `Option 1 text is required`;
      }
      if (!question.option2 || question.option2.trim() === "") {
        errorObj.option2 = `option2 text is required`;
      }
      if (!question.option3 || question.option3.trim() === "") {
        errorObj.option3 = `option3 text is required`;
      }
      if (!question.option4 || question.option4.trim() === "") {
        errorObj.option4 = `option4 text is required`;
      }
      if (!question.option5 || question.option5.trim() === "") {
        errorObj.option5 = `option5 text is required`;
      }
      if (!question.correct_answer || question.correct_answer.trim() === "") {
        errorObj.correct_answer = `correctAnswer  is required`;
      }

      errors.push(errorObj);
    });

    setErrorMessages(errors);
    return errors.every((error) => Object.keys(error).length === 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (currentIndex === maxIndex && validateInputs()) {
        const formattedQuestions = questions.map((question, index) => ({
          exam_id: parseInt(examID),
          exam_title: examTitle,
          question_id: generateQuestionId(),
          question_type: question.question_type,
          question_text: question.question_text,
          options: [
            question.option1.trim(),
            question.option2.trim(),
            question.option3.trim(),
            question.option4.trim(),
            question.option5.trim(),
          ].filter(Boolean),
          correct_answer: question.correct_answer,
          view_description: viewDescriptions[index], 
        }));

        console.log("Formatted Questions:", formattedQuestions);

        const data = await axios.post(
          "http://127.0.0.1:8000/api/questions/create/",
          { questions: formattedQuestions }
        );

        console.log("Questions added:", data, formattedQuestions);
        alert("Questions added successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error adding questions:", error);
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <form onSubmit={handleSubmit}>
        <h1>Question No: {generateQuestionId()}</h1>
        <div>
          <div>
            <TextField
              variant="outlined"
              fullWidth
              label={`Question ${currentIndex + 1}`}
              name="question_text"
              value={questions[currentIndex]?.question_text || ""}
              onChange={(e) => handleChange(currentIndex, e)}
              error={!!errorMessages[currentIndex]?.question_text}
              helperText={errorMessages[currentIndex]?.question_text}
            />
            <TextField
              variant="outlined"
              fullWidth
              label={`Exam Title`}
              name="examTitle"
              value={examTitle}
              // No need for onChange as it's coming from URL params
              error={!!errorMessages[currentIndex]?.examTitle}
              helperText={errorMessages[currentIndex]?.examTitle}
            />{" "}
            {alphabet.slice(0, 5).map((letter, optionIndex) => (
              <PaddedTextField
                key={optionIndex}
                variant="outlined"
                fullWidth
                label={`${String.fromCharCode(65 + optionIndex)}`} // Displaying A, B, C, D labels
                name={`option${optionIndex + 1}`}
                value={
                  questions[currentIndex][`option${optionIndex + 1}`] || ""
                }
                onChange={(e) => handleChange(currentIndex, e)}
                error={
                  !!errorMessages[currentIndex][`option${optionIndex + 1}`]
                }
                helperText={
                  errorMessages[currentIndex][`option${optionIndex + 1}`]
                }
              />
            ))}
            <PaddedTextField
              variant="outlined"
              fullWidth
              label="Correct Answer (e.g., A, B, C)"
              name="correct_answer"
              value={questions[currentIndex]["correct_answer"] || ""}
              onChange={(e) => handleChange(currentIndex, e)}
              error={!!errorMessages[currentIndex]["correct_answer"]}
              helperText={errorMessages[currentIndex]["correct_answer"]}
            />
            <TextField
              variant="outlined"
              fullWidth
              label={`Question Explanation ${currentIndex + 1}`}
              name="view_description"
              value={viewDescriptions[currentIndex] || ""}
              onChange={(e) => handleChange(currentIndex, e)}
              // ... (existing error handling)
            />
            <StyledSelect
              variant="outlined"
              label="Question Type"
              value={questions[currentIndex].question_type || ""}
              onChange={(e) => handleChange(currentIndex, e)}
              name="question_type"
              error={!!errorMessages[currentIndex]?.question_type}
              helperText={errorMessages[currentIndex]?.question_type || ""}
            >
              <MenuItem value="radio">Radio</MenuItem>
              <MenuItem value="dropdown">Dropdown</MenuItem>
            </StyledSelect>
          </div>
        </div>

        <div>
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={!showPrevious}
          >
            Previous
          </Button>
          <Button type="button" onClick={handleNext} disabled={!showNext}>
            Next
          </Button>
          {currentIndex === maxIndex && <Button type="submit">Submit</Button>}
        </div>
      </form>
    </StyledContainer>
  );
}

export default AddQuestionPage;
