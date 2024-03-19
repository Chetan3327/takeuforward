import React, { useEffect } from 'react'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Submit = () => {
  useEffect(() => {
    axios.get(`${BACKEND_URL}`).then((res) => {
      console.log(res.data)
    })
  })
  return (
    <div>
      submit
    </div>
  )
}

export default Submit
