import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import ModalView from './ModalView'
import { yellowImg } from '../utils'
import * as THREE from "three"
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { models, sizes } from '../constent/constent'
import { animateWithGsapTimeline } from '../utils/animation'
import { transform } from 'typescript'

const Modal = () => {
  const [size,setSize]=useState("small");
  const [modal,setModal]=useState({
    title:"iPhone 15 Pro in Natural Titanium",
    color:["#8F8A81","#FFE7B9","6F6C64"],
    img:yellowImg
  });
  console.log('modal:', modal);
  const cameraControlSmall=useRef()
  const cameraControlLarge=useRef();
  const small=useRef(new THREE.Group());
  const large=useRef(new THREE.Group());
  const [smallRotation,setSmallRotation]=useState(0)
  const [largeRotation,setLargeRotation]=useState(0);
  const tl=gsap.timeline();

  useEffect(()=>{
    if(size==="large"){
      animateWithGsapTimeline(tl,small,smallRotation,"#view1","#view2",{
        transform:"translateX(-100%)",
        duration:2
      })
    }
    if(size==="small"){
      animateWithGsapTimeline(tl,large,largeRotation,"#view1","#view2",{
        transform:"translateX(0)",
        duration:2
      })
    }
  },[size])
  useGSAP(()=>{
    gsap.to("#heading",{
      y:0,
      delay:2,
      opacity:1
    })  })
  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <h1 className='section-heading' id="heading">
          Take a Closer Look.
        </h1>
        <div className='flex flex-col items-center mt-5'>
          <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
          <ModalView
          index={1}
          groupRef={small}
          gsapType="view1"
          controlRef={cameraControlSmall}
          setRotationalRef={setSmallRotation}
          item={modal}
          size={size}
          />
          <ModalView
          index={2}
          groupRef={large}
          gsapType="view2"
          controlRef={cameraControlLarge}
          setRotationalRef={setLargeRotation}
          item={modal}
          size={size}
          />
          </div>
          <Canvas className='w-full h-full' style={{position:"fixed",left:0,right:0,bottom:0,top:0,overflow:"hidden"}} eventSource={document.getElementById("root")}>
            <View.Port/>
          </Canvas>
        </div>
        <div className='mx-auto w-full'>
          <p className='text-sm font-light text-center mb-5'>{modal.title}</p>
        </div>
        <div className='flex-center'>
          <ul className='color-container'>
            {
              models.map((item,i)=>(
                <li key={i} className='w-6 h-6 rounded-full mx-2 cursor-pointer' style={{backgroundColor:item.color[0]}} onClick={()=>setModal(item)}/>
              ))
            }
          </ul>
          <button className='size-btn-container'>
            {   
              sizes.map(({label,value})=>(
               <span key={value} className='size-btn' style={{background:size===value?"white":"transparent",color:size===value?"black":"white"}} onClick={()=>setSize(value)}>{label}</span>
              ))
            }
          </button>
        </div>
      </div>
    </section>
  )
}

export default Modal