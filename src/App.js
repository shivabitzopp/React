
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Home from "./Home";
import QuizResult from "./QuizResult";
import Signup from "./Signup";
import PrivateRoute from "./ProtectedRoute";
import { DragDropContext } from "react-beautiful-dnd";
import AdminLoginPage from './AdminLoginPage';
import Dashboard from "./Dashboard";
import AddQuestion from './AddQuestion';
import ExamPage from "./ExamPage";


function App() {
  return (
    
    <div>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin"  element={<AdminLoginPage />} />
        <Route exact path="/" element={<PrivateRoute />}/>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/add-question/:totalQuestions/:exam_id" element={<AddQuestion />} />
  
        <Route path="/exampage/:exam_id/:email" element={<ExamPage />} />

        <Route exact path="/results" element={<PrivateRoute />}>
          <Route exact path="/results" element={<QuizResult />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
      </Routes>

      
    </div>
  );
}
export default App;