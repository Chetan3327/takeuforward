import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Editor } from '@monaco-editor/react'
import LanguageDropDown from '../components/LanguageDropDown'
import OutputWindow from '../components/OutputWindow'
import Details from '../components/Details'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const Submit = () => {
  const [code, setCode] = useState(`console.log('hello, world')`)
  const [language, setLanguage] = useState({id: 63, name: 'JavaScript (Node.js 12.14.0)', label: 'JavaScript (Node.js 12.14.0)', value: 'javascript'})
  const [customInput, setCustomInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [outputDetails, setOutputDetails] = useState(null)
  const [username, setUsername] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const handleUserNameInput = (e) => {
    setUsername(e.target.value)
    setError(false)
  }
  const handleCompile = () => {
    if(!username){
      setError(true)
      toast.error('username is missing!')
      return
    }
    // console.log('compiling start')
    setLoading(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    console.log(formData)
    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        console.log('token', token)
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setLoading(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    console.log('checking status')
    const options = {
      method: "GET",
      url: import.meta.env.VITE_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still loading
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setLoading(false)
        setOutputDetails(response.data)
        // showSuccessToast(`Compiled Successfully!`)
        console.log('response.data', response.data)
        createSubmission(response.data)
        return
      }
    } catch (err) {
      console.log("err", err);
      setLoading(false);
      // showErrorToast();
    }
  };

  const createSubmission = async (outputDetails) => {
    const data = {
      username,
      codeLanguage: outputDetails.language.name, 
      stdin: atob(outputDetails.stdin),
      stdout: atob(outputDetails.stdout), 
      timestamp: outputDetails.finished_at, 
      sourceCode: atob(outputDetails.source_code)
    }
    try {
      const res = await axios.post(`${BACKEND_URL}/submission`, data)
      console.log(res.data)
      toast.success('Code Submitted Successfully!')
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className='flex min-h-screen p-5 gap-5'>
      <div className='flex bg-secondary rounded-md w-[30vw] justify-center items-center'>
        question
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col h-full bg-secondary rounded-md w-[70vw]'>
          <div className='p-1 flex justify-between px-4'>
            <LanguageDropDown language={language} setLanguage={setLanguage} />
          </div>
          <Editor defaultValue={code} onChange={(value) => setCode(value)} height='100%' language={language.value} theme='vs-dark' />
        </div>
        <div className='flex gap-5 p-5 h-full bg-secondary rounded-md w-[70vw]'>
          <div className='flex flex-col gap-4 w-[50%] rounded-md'>
            <div className='flex gap-4'>
              <input disabled={loading} type="text" className={`w-full bg-[#333] rounded-md p-1.5 outline-none ${error ? 'border border-red-600' : ''}`} placeholder='Enter Username...' onChange={(e) => handleUserNameInput(e)} />
              <button disabled={loading} onClick={() => handleCompile()} className='bg-gray-600 px-4 rounded-md outline-none hover:bg-gray-600/90'>{loading ? 'executing...' : 'submit'}</button>
            </div>
            <textarea disabled={loading} onChange={(e) => setCustomInput(e.target.value)} className='w-full h-full outline-none bg-[#333] p-1 rounded-md' placeholder='custom input...'></textarea>
          </div>
          <div className='w-[50%] rounded-md flex flex-col gap-4'>
            {outputDetails ? (<>
              <Details outputDetails={outputDetails} />
              <OutputWindow outputDetails={outputDetails} />
            </>) : (<div className='rounded-md bg-[#333333] flex justify-center items-center h-full'>No output</div>)}
            <button onClick={() => navigate('/submissions')} className='bg-gray-600 px-4 p-2 rounded-md outline-none hover:bg-gray-600/90'>View All Submissions</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Submit
