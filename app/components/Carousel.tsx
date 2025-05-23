import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Carousel = () => {
    return(
        <div className=" relative w-screen h-fit overflow-x-hidden group ">
          <ul 
            className={` flex w-fit h-[80dvh] transition-all ease-in-out duration-[1.8s]`}
            style={{transform: `translateX(calc(${currentSlide} * 100vw))`}}
          >
            {
              carouselData.map((obj, idx) => {
                return (
                  <li
                    className={` flex w-screen h-full overflow-hidden relative `} 
                    style={{ 
                      backgroundImage: `url(${obj.bgimage})`,
                      // transition: 'all 2s ease-in-out',
                    }}
                    key={idx}
                    id="slideEffect"
                  >
                      <motion.div
                        className="absolute w-full h-full bg-white"
                        animate={{ opacity: Math.abs(currentSlide) === idx ? 0 : 0.8 }}
                        transition={{ duration: 4 }}
                      />
                      <div 
                        className={` h-full ${Math.abs(currentSlide) === idx ? "translate-x-[-200%]" : "translate-x-[0%]"} w-full transition-all ease-in-out duration-[3s] before:block before:w-full before:h-full before:bg-black before:opacity-50 `}
                        style={{transitionDelay: "1500ms", backgroundImage: `url(${obj.bgimage})`}}
                        id="slideEffect"
                      ></div>
                      <motion.div 
                        className={` absolute w-full flex flex-col gap-3 text-black justify-center items-center top-[30%] translate-y-[-50%] ${Math.abs(currentSlide) === idx ? "max-w-full" : "max-w-0"} transition-all ease-in-out duration-[1.5s] `} 
                        initial={{opacity: 0, y: 50}}              
                        animate={Math.abs(currentSlide) === idx ? {opacity: 1, y: 0}: {}}
                        transition={{duration: 0.4, ease: "easeInOut", delay: 2}}
                      >
                        <motion.p
                          className=" rounded-2xl px-4 py-2 text-white text-[26px] bg-black bg-opacity-50 "
                          initial={{x: -90, opacity:0}}
                          animate={Math.abs(currentSlide) === idx ? {opacity: 1, x: 0} : {}}
                          transition={{duration: .6, ease: "easeInOut", delay: .8}}
                        >
                          BEST EDUCATION
                        </motion.p>
                        <motion.h1
                          className=" text-[45px] text-white bg-black bg-opacity-50 px-4 py-2 rounded-2xl "
                          initial={{y: -90, opacity:0}}
                          animate={Math.abs(currentSlide) === idx ? {opacity: 1, y: 0} : {}}
                          transition={{duration: .4, ease: "easeInOut", delay: .8}}
                        >FOR YOUR BETTER FUTURE</motion.h1>
                      </motion.div>
                  </li>
                )
              })
            }
          </ul>
          <div className=" absolute flex group-hover:opacity-100 opacity-0 justify-between items-center w-screen px-2 top-[50%] translate-y-[-50%] transition-all duration-700 " >
            <span 
              onClick={() => hanldeSlider(1)}
              className={` carouselSlideActionBtn bg-p transition-all duration-400 `}
              style={{
                backgroundImage: `url(${ Math.abs(currentSlide) - 1 < 0 ? carouselData[carouselData.length - 1].bgimage : carouselData[Math.abs(currentSlide) - 1].bgimage})`, // set Arrow button background image dynamically
                transition: 'all 1s ease-in-out',
              }}
              id="slideEffect"
            >
              <FontAwesomeIcon className=" text-[20px] hover:scale-110 cursor-pointer transition-all duration-300 " icon={faAngleLeft} />
            </span>
            <span 
              onClick={() => hanldeSlider(-1)} 
              className={` carouselSlideActionBtn transition-all duration-400 `}
              style={{ 
                backgroundImage: `url(${ Math.abs(currentSlide) + 1 > carouselData.length - 1 ? carouselData[0].bgimage : carouselData[Math.abs(currentSlide) + 1].bgimage})`, // set Arrow button background image dynamically
                transition: 'all 1s ease-in-out',
              }}
              id="slideEffect"
            >
              <FontAwesomeIcon className=" text-[20px] hover:scale-110 cursor-pointer transition-all duration-300 " icon={faAngleRight} />
            </span>
          </div>
        </div>
    )
}