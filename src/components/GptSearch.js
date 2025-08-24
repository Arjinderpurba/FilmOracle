import React from 'react'
import GptMovieSuggestions from './GptMovieSuggestions'
import GptSearchbar from './GptSearchbar'
import { BGIMG } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img
          src={BGIMG}
          alt="bgimg"
        />
      </div>
      <GptSearchbar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch