import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { updateJob, addJob } from '../ApiCalls';
import InputField from './InputField';


export default function MyModal(props) {
  let [isOpen, setIsOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [jobData, setJobData] = useState({
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
  });
  const [QAChecked, setQAChecked] = useState(false);
  const [EAChecked, setEAChecked] = useState(false);

  useEffect(() => {
    setJobData(props.jobObj)
  },[])


  const QAClicked = () => {
    setEAChecked(false);
    setQAChecked(true);
    let newJobData = {...jobData};
    newJobData.apply_type = "quick_apply";
    setJobData(newJobData);
  }

  const EAClicked = () => {
    setEAChecked(true);
    setQAChecked(false);
    let newJobData = { ...jobData };
    newJobData.apply_type = "external_apply";
    setJobData(newJobData);
    console.log(newJobData);
  }

  const nextPage = () => {
    if (jobData.job_title==="" || jobData.company_name==="" || jobData.industry==="")
      alert("Please fill in all the madatory fields");
    else
      setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const UpdateJob = async () => {
    try {
      const res = await updateJob(jobData);
      props.dataVarSet();
    } catch (error) {
      console.log(error);
    }
  };

  const AddJob = async () => {
    try {
      const res = await addJob(jobData);
      props.dataVarSet();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    console.log(jobData);
    if (jobData.id !== "") {
      UpdateJob();
    }
    else{
      AddJob();
    }
    props.closeModal();
    previousPage();
  }

  const handleFormChange = (e) => {
    let newJobData = { ...jobData };
    const curr_id = e.target.id;
    newJobData[curr_id] = e.target.value;
    setJobData(newJobData);
  }


  const renderInsideModal = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <InputField
              id='job_title'
              label='Job title'
              value={jobData.job_title}
              onChange={handleFormChange}
              placeholder='ex. UX UI Designer'
            />

            <InputField
              id='company_name'
              label='Company Name'
              value={jobData.company_name}
              onChange={handleFormChange}
              placeholder='ex. Google'
            />

            <InputField
              id='industry'
              label='Industry'
              value={jobData.industry}
              onChange={handleFormChange}
              placeholder='ex. Information Technology'
            />

            <div className='-my-1 flex space-x-4 '>
              <div className='w-full'>
                <InputField
                  id='location'
                  label='Location'
                  value={jobData.location}
                  onChange={handleFormChange}
                  placeholder='ex. Chennai'
                />
              </div>

              <div className='w-full '>
                <InputField
                  id='remote_type'
                  label='Remote Type'
                  value={jobData.remote_type}
                  onChange={handleFormChange}
                  placeholder='ex. In-office'
                />
              </div>
            </div>

            <button
              onClick={nextPage}
              className='border px-4 py-2 float-right mt-12 bg-blue-400 text-white rounded-md'
            >
              Next
            </button>
          </>
        );
      case 2:
        return (
          <>
            <div className='flex space-x-4 my-5'>
              <div className='w-full -my-4'>
                <InputField
                  id='min_exp'
                  label='Experience'
                  value={jobData.min_exp}
                  onChange={handleFormChange}
                  type='number'
                  placeholder='Minimum'
                />
              </div>
              <div className='w-full -my-4'>
                <InputField
                  id='max_exp'
                  label='Experience'
                  value={jobData.max_exp}
                  onChange={handleFormChange}
                  type='number'
                  placeholder='Maximum'
                />
              </div>
            </div>

            <div className='flex space-x-4 -my-5'>
              <div className='w-full'>
                <InputField
                  id='min_salary'
                  label='Salary'
                  value={jobData.min_salary}
                  onChange={handleFormChange}
                  type='text'
                  placeholder='Minimum'
                />
              </div>
              <div className='w-full'>
                <InputField
                  id='max_salary'
                  label='Salary'
                  value={jobData.max_salary}
                  onChange={handleFormChange}
                  type='text'
                  placeholder='Maximum'
                />
              </div>
            </div>

            <InputField
              id='employee'
              label='Total Employee'
              value={jobData.employee}
              onChange={handleFormChange}
              type='text'
              placeholder='ex. 100'
            />

            <div className='my-5'>
              <label>Apply Type</label>
              <div className='flex space-x-4' >
                <div className='flex  space-x-2'>
                  <span
                    className={`h-5 w-5 inline-block rounded-full border border-gray-300 ${QAChecked ? 'bg-blue-400 border-transparent' : ''}`}
                    onClick={() => { QAClicked() }}
                  />
                  <p className='text-gray-400' >Quick Apply</p>
                </div>
                <div className='flex  space-x-1.5'>
                  <span
                    className={`h-5 w-5 inline-block rounded-full border border-gray-300 ${EAChecked ? 'bg-blue-400 border-transparent' : ''}`}
                    onClick={() => { EAClicked() }}
                  />
                  <p className='text-gray-400' >External Apply</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className='border px-4 py-2 float-right mt-16 bg-blue-400 text-white rounded-md'
            >
              Save
            </button>
          </>
        );
    }

  }


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog  as="div" className="relative z-10" onClose={props.closeModal}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">


              <Dialog.Panel className="w-full min-h-full max-w-xl rounded-md transform overflow-hidden bg-white p-8 text-left align-middle shadow-xl transition-all">

                <div className='h-5 items-center' >
                  <h3 className='flex float-left text-xl' >Create a job</h3>
                  <h3 className='flex float-right text-base' >Step {currentPage}</h3>
                </div>

                {renderInsideModal()}

              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
