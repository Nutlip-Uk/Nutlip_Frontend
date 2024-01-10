// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '../styles/Home.module.css'
// import Navbar from '../comps/Navbar'
import Hero from '../components/Home/Hero'
import Why from '../components/Home/Why'
import Revolutionizing from '../components/Home/Revolutionizing'
import PropertyView from '../components/Home/PropertyView'


export default function Home() {
  return (
    <main className='wrapper'>
      <Hero />
      <Revolutionizing />
      <PropertyView />
      <Why />
    </main>
  )
}
