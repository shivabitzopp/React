import React, { useState, useEffect } from 'react';

function QuizApp() {
    const [questions, setQuestions] = useState([]);
    const [selectedClass, setSelectedClass] = useState('class9'); // Default to Class 9

    useEffect(() => {
        fetch(`/api/questions/${selectedClass}`)
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, [selectedClass]);

    return (
        <div>
            <button onClick={() => setSelectedClass('class9')}>Class 9</button>
            <button onClick={() => setSelectedClass('class10')}>Class 10</button>

            <h2>Quiz Questions</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question.question}</li>
                ))}
            </ul>
        </div>
    );
}

export default QuizApp;
