import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Overlay from '../components/Overlay'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
console.log(BACKEND_URL)
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
  const [displayInfo, setDisplayInfo] = useState(null)
  return (
    <>
      <div className={`flex min-h-screen gap-5`}>
        <div className='flex bg-secondary rounded-md w-full shadow-lg m-5'>
          <div className="overflow-x-auto shadow-md sm:rounded-lg w-full">
              {data ? (<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Username
                          </th>
                          <th scope="col" className="px-6 py-3">
                              CodeLanguage
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Stdin
                          </th>
                          <th scope="col" className="px-6 py-3">
                              StdOut
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Timestamp
                          </th>
                          <th scope="col" className="px-6 py-3">
                              SourceCode
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {data.map((item, idx) => {
                      return <tr key={idx} className="odd:bg-white odd:dark:bg-[#333] even:bg-gray-50 even:dark:bg-secondary border-b dark:border-secondary">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.username}
                        </th>
                        <td className="px-6 py-4">
                            {item.codeLanguage}
                        </td>
                        <td className="px-6 py-4">
                            {item.stdin}
                        </td>
                        <td className="px-6 py-4">
                            {item.stdout}
                        </td>
                        <td className="px-6 py-4">
                            {item.timestamp}
                        </td>
                        <td className="px-6 py-4">
                          <span onClick={() => setDisplayInfo(item)} className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">View</span>
                        </td>
                      </tr>
                    })}
                  </tbody>
              </table>):(<div className='flex justify-center items-center h-full'>Loading...</div>)}
          </div>
        </div>
        {displayInfo && (<Overlay displayInfo={displayInfo} setDisplayInfo={setDisplayInfo} />)}
      </div>
    </>
  )
}

export default Submissions
