import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { highlightsSlides } from "../constent/constent";
import { pauseImg, playImg, replayImg } from "../utils";
import { list } from "postcss";
gsap.registerPlugin(ScrollTrigger);
const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);
  console.log("videoRef:", videoRef.current);
  const { isEnd, isLastVideo, isPlaying, startPlay, videoId } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;
    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          let progress = Math.ceil(anim.progress() * 100);
          if (progress != currentProgress) {
            // console.log('videoDivRef[videoId]:', videoDivRef[videoId]);
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760
              ? "10vw"
              : window.innerWidth < 1200
              ? "10vw"
              : "4vw",
               
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              background: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
          }
          gsap.to(span[videoId], {
            backgroundColor: "#afafaf",
          });
        },
        
      }); 
      if (videoId == 0) {
        anim.restart();
      }
      let animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration
        );
      };
      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }     
    }
    
  }, [videoId,startPlay]);

  const handleLoadMetaData = (i, el) => setLoadedData((pre) => [...pre, el]);
  // console.log('loadedData:', loadedData)

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "video-last":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: true,
        }));
        break;
      case "video-reset":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;
      case "pause":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.length &&
          highlightsSlides?.map((item, index) => (
            <div key={item.id} id="slider" className=" pr-10 sm:pr-20 ">
              <div className="video-carousel_container">
                <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                  <video
                    className={`${item.id===2 && "translate-x-44"} pointer-events-none`}
                    onLoadedMetadata={(e) => handleLoadMetaData(index, e)}
                    id="video"
                    ref={(el) => (videoRef.current[index] = el)}
                    onEnded={() =>
                      index !== 3
                        ? handleProcess("video-end", index)
                        : handleProcess("video-last")
                    }
                    onPlay={(prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    })}
                    playsInline={true}
                    preload="auto"
                    muted
                  >
                    <source src={item?.video} type="video/mp4" />
                  </video>
                </div>
                <div className="absolute top-12 left-[5%]">
                  {item.textLists.map((text, index) => (
                    <p
                      className="md:text:2xl text-xl font-medium z-10"
                      key={text}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef?.current?.map((_, index) => (
            <span
              key={index}
              ref={(el) => (videoDivRef.current[index] = el)}
              className="mx-2 w-3 h-3 rounded-full relative bg-gray-100 cursor-pointer"
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (videoSpanRef.current[index] = el)}
              ></span>
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
