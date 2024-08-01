import './App.css'
// @ts-ignore
import Navbar from "./components/Navbar.jsx"
// @ts-ignore
import Hero from "./components/Hero.jsx"
// @ts-ignore
import Highlight from "./components/Highlights.jsx"
// @ts-ignore
import Modal from "./components/Modal.jsx"
import * as Sentry from "@sentry/react";
function App() {
  // return <button onClick={() => methodDoesNotExist()}>Break the world</button>;

  return (
    <>
    <main className='bg-black'>
      <Navbar/>
      <Hero/>
      <Highlight/>
      <Modal/>
    </main>
    </>
  )
}

export default  Sentry.withProfiler(App);
