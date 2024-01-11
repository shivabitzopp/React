
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '200vh',
    backgroundColor: '#55B4B0',
    padding: '160px',
    borderRadius: '8px',
    width: '80%',
    margin: 'auto',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    '& > .classContainer': {
      background: '#93b0d2',
      color: 'white',
      padding: '8px',
      borderRadius: '4px',
      marginBottom: '16px', // Increase space between containers
      '& > h5': {
        marginBottom: '8px', // Create space between title and list
      },
      '& > ul': {
        listStyleType: 'none', // Remove default list styles
        padding: 0,
        '& > li': {
          marginBottom: '8px', // Space between items
          '& > button': {
            background: '#9c9dc9',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              background: '#7b7caf',
            },
          },
        },
      },
    },
  },
}));

function HomePage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [classExams, setClassExams] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/get-exam-titles/')
      .then(response => {
        const examsData = response.data;
        const groupedExams = {};

        examsData.forEach(exam => {
          if (!groupedExams[exam.class_number]) {
            groupedExams[exam.class_number] = [];
          }
          groupedExams[exam.class_number].push({ exam_id: exam.exam_id, exam_title: exam.exam_title });
        });

        setClassExams(groupedExams);
      })
      .catch(error => {
        console.error('Error fetching exams:', error);
      });
  }, []);

  const handleExamClick = (examId, emailId) => {
    navigate(`/exampage/${encodeURIComponent(examId)}/${encodeURIComponent(emailId)}`);
    console.log(examId)
  };
  
  return (
    <div className={classes.root}>
      {Object.keys(classExams).map(classNumber => (
        <div key={classNumber} className="classContainer">
          <Typography variant="h5">
            Class {classNumber}
          </Typography>
          <ul>
            {classExams[classNumber].map(exam => (
              <li key={exam.exam_id}>
                <button
                  onClick={() => handleExamClick(exam.exam_id)}
                >
                  {exam.exam_title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
