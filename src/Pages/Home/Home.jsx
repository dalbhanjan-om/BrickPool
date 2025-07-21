import React from 'react'
import Navbar from '../../components/Navbar'
import HomePage from './HomeContents'
import CardSlider from './CardSlider'

export const Home = () => {
  return (
    <div>
        <Navbar />
        <CardSlider/>
        <HomePage/>
    </div>
  )
}
