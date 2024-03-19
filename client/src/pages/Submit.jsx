import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Editor } from '@monaco-editor/react'
import LanguageDropDown from '../components/LanguageDropDown'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Submit = () => {
  const [code, setCode] = useState(`console.log('hello, world')`)
  const [language, setLanguage] = useState('javascript')
  return (
    <div className='flex min-h-screen p-5 gap-5'>
      <div className='flex bg-secondary rounded-md w-[30vw]'>
        question
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col h-full bg-secondary rounded-md w-[70vw]'>
          <div className='p-1'>
            <LanguageDropDown language={language} setLanguage={setLanguage} />
          </div>
          <Editor defaultValue={code} onChange={(value) => setCode(value)} height='100%' language={language} theme='vs-dark' />
        </div>
        <div className='flex h-full bg-secondary rounded-md w-[70vw]'>
          testcase
        </div>
      </div>
    </div>
  )
}

export default Submit
