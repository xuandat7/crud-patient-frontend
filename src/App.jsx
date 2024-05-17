import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HelloWorld from './HelloWorld'
import ListPatientComponent from './component/ListPatientComponent'
import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PatientComponent from './component/PatientComponent'
import ResultComponent from './component/ResultComponent'
import HomeComponent from './component/HomeComponent'

function App() {


  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            <Route path='/' element = {<HomeComponent />}></Route>
            <Route path='/patients' element = {<ListPatientComponent />}></Route>
            <Route path='/add-patient' element = {<PatientComponent />}></Route>
            <Route path='/edit-patient/:id' element = {<PatientComponent />}></Route>
            <Route path='/edit-result/:id' element = {<ResultComponent />}></Route>
            <Route path='/add-result' element = {<ResultComponent />}></Route>

          </Routes>

        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
