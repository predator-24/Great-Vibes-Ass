import { API_URL } from "./constant";
import axios from "axios";

export async function deleteJob(id) {
    try {
        const response = await axios.delete(API_URL+`/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting job');
    }
}

export async function getJobs() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting job');
    }
}

export async function updateJob(jobData){
    try{
        const response = await axios.put(API_URL + `/${jobData.id}`,jobData);
        console.log(response);
    }
    catch(err){
        throw new Error('Error deleting job');
    }
}

export async function addJob(jobData){
    try{
        const response = await axios.post(API_URL, jobData);
        console.log(response);
    }
    catch(err){
        throw new Error('Error adding job');
    }
} 
