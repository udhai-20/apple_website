export const animateWithGsapTimeline=(timeline,rotationRef,rotationState,firstTarget,secondTarget,animation)=>{

    timeline.to(rotationRef.current.rotation,{
        y:rotationState,
        duration:1,
        ease:"power2.inOut"
    });
    timeline.to(firstTarget,{
        ...animation,
        ease:"power2.inOut"
    },"<");
    timeline.to(secondTarget,{
        ...animation,
        ease:"power2.inOut"
    },"<");
}