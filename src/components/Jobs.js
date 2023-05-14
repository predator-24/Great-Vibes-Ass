import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import { getJobs } from '../ApiCalls';


const Jobs = (props) => {

    const [AllJobData,setAllJobData] = useState([]);
    const GetJobs = async () => {
        try {
            const res = await getJobs();
            setAllJobData(res);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() =>{
        GetJobs()
    }, [props.dataVar])

    return (
        <>
            <div className='bg-gray-400 w-full font-poppins' >
                <p className='mx-5 my-5 text-3xl px-5 py-5 ' >Available Jobs</p>
                <div className='flex flex-wrap' >   
                {AllJobData.map((job,index)=>(
                    <div key={index} className='w-1/2 p-4'  >
                        <JobCard jobDetails={job} dataVar={props.dataVarSet} /> 
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default Jobs