import React from 'react'
import {languages} from '../data/languages'
console.log(languages[0])
const LanguageDropDown = ({language, setLanguage}) => {
  const handleLanguageChange = (e) => {
    const selectedLanguage = languages.find(lang => lang.id === parseInt(e.target.value));
    setLanguage(selectedLanguage);
  }
  return (
    <select className='bg-secondary outline-none' onChange={(e) => handleLanguageChange(e)}>
      {languages.map((item, idx) => {
        return(<option key={idx} value={item.id}>{item.name}</option>)
      })}
    </select>
  )
}

export default LanguageDropDown
