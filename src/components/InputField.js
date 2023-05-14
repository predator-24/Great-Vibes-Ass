import React from 'react';


const Star = ({label}) =>{
    if(label==='Job title' || label==='Company Name' || label=='Industry'){
        return(
            <span className='text-red-600'>*</span>
        )   
    }
    return (<></>)
}


const InputField = ({ id, label, value, onChange, placeholder }) => {
    return (
        <div className='my-5'>
            <label>
                {label}
                <Star label={label} />
            </label>
            <br />
            <input
                type='text'
                id={id}
                value={value}
                onChange={onChange}
                className='border border-slate-200 px-2 py-3 h-9 w-full rounded-md'
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
