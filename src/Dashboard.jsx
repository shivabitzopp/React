import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const [examTitle, setExamTitle] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [examId, setExamId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleCreateExam = () => {
    const examData = {
      exam_title: examTitle,
      class_number: classNumber,
      total_question: parseInt(totalQuestions),
    };

    axios
      .post("http://127.0.0.1:8000/create_exam/", examData)
      .then((response) => {
        console.log("Exam created:", response.data);
        setExamId(response.data.exam_id);
        navigate(`/add-question/${totalQuestions}/${response.data.exam_id}`);
        console.log(totalQuestions);
      })
      .catch((error) => {
        console.error("Error creating exam:", error);
        if (error.response && error.response.status === 400) {
          setModalContent("An exam with the same title and class already exists.");
          setShowModal(true);
        }
      });
  };
  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <Form>
        <Form.Group controlId="examTitle">
          <Form.Label>Exam Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter exam title"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="classNumber">
          <Form.Label>Class Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter class number"
            value={classNumber}
            onChange={(e) => setClassNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="totalQuestions">
          <Form.Label>Total Questions</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter total questions"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(parseInt(e.target.value))}
          />
        </Form.Group>

        <Button variant="warning" onClick={handleCreateExam}>
          Create Exam
        </Button>
      </Form>

      {/* Modal for showing the error message */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;