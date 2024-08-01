import { Html } from '@react-three/drei'
import React from 'react'

const Loader = () => {
  return (
   <Html>
    <div className='absolute w-full h-full top-0 left-0 flex items-center justify-center'>
        <div className='w-[10vw] h-[10vw] rounded-full'>loading</div>
    </div>
   </Html>
  )
}

export default Loader