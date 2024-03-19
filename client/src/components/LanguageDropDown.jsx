import React from 'react'
import {languages} from '../data/languages'
console.log(languages[0])
const LanguageDropDown = ({language, setLanguage}) => {
  return (
    <select className='bg-secondary outline-none' onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((item, idx) => {
        return(<option key={idx} value={item.value}>{item.name}</option>)
      })}
    </select>
  )
}

export default LanguageDropDown
