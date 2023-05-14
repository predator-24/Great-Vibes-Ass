import React, { useState } from 'react';
import Popup from './Popup';
import { deleteJob } from '../ApiCalls';

const JobCard = (props) => {
    const jobObj = props.jobDetails;
    const [editClick,setEditClick] = useState(false);

    function closeModal() {
        setEditClick(false)
    }

    function openModal() {
        setEditClick(true);
    }

    const editClicked = (e) => {
        console.log(jobObj.id);
        setEditClick(true);

    };

    const deleteClicked = async () => {
        try {
            const res = await deleteJob(jobObj.id);
            console.log(res);
            props.dataVar();
        } catch (error) {
            console.log(error);
        }
    };



    function ShowButtons(){
        if(jobObj.apply_type === 'quick_apply'){
            return(
                <>
                    <button className='border px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md' >Apply Now</button>
                    <button className='border px-3 py-1.5 text-sm border-blue-500 text-blue-500 rounded-md' >External Apply</button>
                </>
            )
        }
        return (
        <>
                <button className='border px-3 py-1.5 text-sm  border-blue-500 text-blue-500 rounded-md' >Apply Now</button>
                <button className='border px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md' >External Apply</button>
        </>
        )
    }

    return (
        <>
            <div className="max-w-xl min-w-fit  mx-5 bg-white rounded-lg ">
                <div className='flex' >
                    <img className="w-10 h-10 rounded-lg mx-4 my-4 object-cover"
                        src="https://cdn.vox-cdn.com/thumbor/sW5h16et1R3au8ZLVjkcAbcXNi8=/0x0:3151x2048/2000x1333/filters:focal(1575x1024:1576x1025)/cdn.vox-cdn.com/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png" />
                    <div className="py-4 ">
                        <h2 className="text-xl">{jobObj.job_title}</h2>
                        <p className="text-gray-800 text-sm">{jobObj.company_name} - {jobObj.industry}</p>
                        <p className="text-gray-400 text-sm">{jobObj.location} ({jobObj.remote_type})</p>
                    </div>
                    <div className='flex ml-auto mr-5 space-x-2' >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer h-5 w-5 my-5 " 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                            onClick={editClicked}>
                            <path 
                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />                        </svg>
                        {editClick && <Popup dataVarSet={props.dataVar} closeModal={closeModal} openModal={openModal} jobObj={jobObj} />}    
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 my-5 cursor-pointer" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                            onClick={deleteClicked}
                            >
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className='px-16 mx-2 space-y-2 ' >
                    <p className="text-gray-800 text-sm">Part-Time (9:00 am - 5:00 pm IST)  </p>
                    <p className="text-gray-800 text-sm">Experience ({jobObj.min_exp}-{jobObj.max_exp} years)</p>
                    <p className="text-gray-800 text-sm">INR (₹)  {jobObj.min_salary}-{jobObj.max_salary}  / Month</p>
                    <p className="text-gray-800 text-sm">{jobObj.employee} Employees</p>
                </div>
                <div className='px-16 py-5 space-x-4 mx-2' >
                    <ShowButtons />
                </div>
            </div>
        </>
    )
}

export default JobCard