import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuLink from './components/MenuLink';

/** pages */
import ProfessorList from './pages/professer/ProfessorList';
import ProfessorView from './pages/professer/ProfessorView';
import ProfessorAdd from './pages/professer/ProfessorAdd';
import ProfessorEdit from './pages/professer/ProfessorEdit';

import StudentList from './pages/student/StudentList';
import TrafficAccList from './pages/traffic_acc/TrafficAccList';

const App = () => {
  return (
    <BrowserRouter>
      <h1>Redux CRUD</h1>
      <MenuLink to='/professorlist'>Professor</MenuLink>
      <MenuLink to='/studentlist'>Student</MenuLink>
      <MenuLink to='/trafficacclist'>Traffic_acc</MenuLink>
      <hr />

      <Routes>
        <Route path='/professorlist' exapt element={<ProfessorList />} />
        <Route path='/professorAdd' element={<ProfessorAdd />} />
        <Route path='/professorView/:id' element={<ProfessorView />} />
        <Route path='/professorEdit/:id' element={<ProfessorEdit />} />

        <Route path='/studentlist' element={<StudentList />} />
        <Route path='/trafficacclist' element={<TrafficAccList />} />
      </Routes>


    </BrowserRouter>
  );
};

export default App;