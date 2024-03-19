import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const Submissions = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`${BACKEND_URL}/submission`)
        setData(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();
  }, [])
  return (
    <div className='flex min-h-screen p-5 gap-5'>
      <div className='flex bg-secondary rounded-md w-full shadow-lg'>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            {data ? (<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" class="px-6 py-3">
                            CodeLanguage
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Stdin
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Timestamp
                        </th>
                        <th scope="col" class="px-6 py-3">
                            SourceCode
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return <tr class="odd:bg-white odd:dark:bg-[#333] even:bg-gray-50 even:dark:bg-secondary border-b dark:border-secondary">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.username}
                      </th>
                      <td class="px-6 py-4">
                          {item.codeLanguage}
                      </td>
                      <td class="px-6 py-4">
                          {item.stdin}
                      </td>
                      <td class="px-6 py-4">
                          {item.timestamp}
                      </td>
                      <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                      </td>
                    </tr>
                  })}
                </tbody>
            </table>):(<div className='flex justify-center items-center h-full'>Loading...</div>)}
        </div>
      </div>
    </div>
  )
}

export default Submissions
