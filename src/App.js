import './App.css';
import Popup from './components/Popup.js';
import Jobs from './components/Jobs';
import { useState } from 'react';

function App() {

  let [isOpen, setIsOpen] = useState(false)
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const jobObj = {
    id: "",
    job_title: "",
    company_name: "",
    industry: "",
    location: "",
    remote_type: "",
    min_exp: "",
    max_exp: "",
    min_salary: "",
    max_salary: "",
    employee: "",
    apply_type: "",
  }
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true);
  }
  const setDataVar  = () =>{
    setIsDataUpdated(!isDataUpdated);
  }

  return (
    <>
      <button onClick={openModal} className='font-poppins border mx-4 my-3 bg-fuchsia-400 px-4 py-2 '>Add Job</button>
      {isOpen && <Popup dataVarSet={setDataVar} jobObj={jobObj} closeModal={closeModal} openModal={openModal}  />}
      <Jobs dataVar={isDataUpdated} dataVarSet={setDataVar}  />
    </>
  );
}

export default App;
