import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useState } from 'react'
import {heroVideo, smallHeroVideo} from "../utils/index"

const Hero = () => {
  const [videSrc,setVideoSrc]=useState(window.innerWidth<760?smallHeroVideo:heroVideo);
  const handleScreenSize=()=>{
    if(window.innerWidth<760){
      setVideoSrc(smallHeroVideo)
    }else{
      setVideoSrc(heroVideo)
    }
  }
  useEffect(()=>{
   window.addEventListener("resize",handleScreenSize);
   return ()=>{
    window.removeEventListener("resize",handleScreenSize)
   }
  },[])
  useGSAP(()=>{
    gsap.to("#hero",{
      delay:2.2,
      opacity:1,
    })
    gsap.to("#combineBtn",{
      delay:2.2,
      y:-10,
      opacity:1
    })
  },[])
  return (
    <section className='w-full bg-black nav-height relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
      <p id='hero' className='hero-title'>iPhone 15 Pro</p>
      <div className='md:w-10/12'>
      <video className='pointer-events-none' autoPlay={true} muted playsInline={true} key={videSrc} >
        <source src={videSrc} type='video/mp4'/>
      </video>
      </div>
      <div id="combineBtn" className='flex flex-col items-center translate-y-10 opacity-0'>
        <a id="#highlights" className='btn'>Buy</a>
        <p className='font-normal text-xl'>From $199 Month/$999</p>
      </div>
      </div>
    </section>
  )
}

export default Hero