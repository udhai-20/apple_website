import React from 'react'
import { rightImg, watchImg } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {
  useGSAP(()=>{
    gsap.to("#title",{
      opacity:1,
      delay:1.2,
      y:0
    })
    gsap.to(".link",{
      opacity:1,
      delay:1.3,
      y:0,
      stagger:.2
    })
  })
  return (
    <section className='w-screen overflow-hidden common-padding h-full bg-zinc'>
      <div className='screen-max-width'>
        <div className='md:flex items-end w-full mb-12 justify-between'>
          <h1 id="title" className='section-heading'>Get the highlights.</h1>
          <div  className='flex flex-wrap items-end  gap-5'>
            <p className='link'>Watch the film
              <img src={watchImg} alt="watch" className="ml-2"/>
            </p>
            <p className='link'>Watch the event
              <img src={rightImg} alt="right" className="ml-2"/>
            </p>
          </div>
        </div>
        <VideoCarousel/>
      </div>
    </section>
  )
}

export default Highlights