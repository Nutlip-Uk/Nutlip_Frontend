// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '../styles/Home.module.css'
// import Navbar from '../comps/Navbar'
import Hero from '../components/Home/Hero'
import Why from '../components/Home/Why'
import Revolutionizing from '../components/Home/Revolutionizing'
import PropertyView from '../components/Home/PropertyView'
import Welcome from '../components/welcome/welcome'
import { useContext } from 'react'
import { RegistrationContext } from '../context/Register.context'
import { LoginContext } from '../context/Login.context'


export default function Home() {

  const { userInformation } = useContext(LoginContext);


  return (
    <main className='wrapper'>
     { userInformation?.user?.newUser == true ?  <Welcome/> : null}
      <Hero />
      <Revolutionizing />
      <PropertyView />
      <Why />
    </main>
  )
}
