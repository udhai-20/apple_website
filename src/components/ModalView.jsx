import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import React, { Suspense } from "react";
import Lights from "./Light";
import { Iphone } from "./Iphone";
import * as THREE from "three"
import Loader from "./Loader";

const ModalView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationalState,
  item,
  size,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={` w-full h-full absolute ${
        index === 2?" right-[-100%]":""}`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls makeDefault enableZoom={false} enablePan={false} rotateSpeed={0.4} target={new THREE.Vector3(0,0,0)} onEnd={()=>setRotationalState(controlRef.current.getAzimuthalAngle())}/>
      <group ref={groupRef} name={`${index == 1}` ? "small" : "large"}>
        <Suspense fallback={<Loader/>}>
          <Iphone  item={item}
            size={size} scale={index===1?[15,15,15]:[17,17,17]} />
        </Suspense>
      </group>
    </View>
  );
};

export default ModalView;
