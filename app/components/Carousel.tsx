import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {motion} from "framer-motion"
import { useEffect, useState } from "react"

const ex1 = "./Assets/ex1.jpg"
const ex2 = "./Assets/ex2.jpeg"
const ex3 = "./Assets/bike.jpg"


const carouselData = [
  {
    bgimage: ex1,
  },
  {
    bgimage: ex2,
  },
  {
    bgimage: ex3,
  },
  {
    bgimage: ex2,
  },
  {
    bgimage: ex3,
  },
]

const navItems = [
  {
    name: "Home",
    id: "#home"
  },
  {
    name: "About Us",
    id: "#about-us"
  },
  {
    name: "Our School",
    id: "#our-school"
  },
  {
    name: "Head of Schools",
    id: "#head-of-school"
  },
  {
    name: "Admissions",
    id: "#admissions"
  },
  {
    name: "Admission Process",
    id: "#admission-process"
  },
  {
    name: "Transfer Students",
    id: "#transfer-students"
  },
  {
    name: "Why Choose Us?",
    id: "#why-choose-us"
  },
  {
    name: "Entrance Examination",
    id: "#entrance-examination"
  },
  {
    name: "Our Curriculum",
    id: "#our-curriculum"
  },
  {
    name: "Contact Us",
    id: "#contact-us"
  },
]

const Carousel = () => {
  // const [carouselData, setCarouselData] = useState([
  //   {
  //     bgimage: ex1,
  //   },
  //   {
  //     bgimage: ex2,
  //   },
  //   {
  //     bgimage: ex1,
  //   },
  //   {
  //     bgimage: ex2,
  //   },
  //   {
  //     bgimage: ex1,
  //   },
  // ]
  // )
    const [activeSection, setActiveSection] = useState<string>("")
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  
    const hanldeSlider = (operation: number) => {
      setCurrentSlide((prev: any) => {
        return prev += operation
      })
    }

    const extendedCarouselData = [
      carouselData[carouselData.length - 1],
      ...carouselData,
      carouselData[0]
    ]

    // useEffect(() => {
    //   if (Math.abs(currentSlide) === extendedCarouselData.length - 1) {
    //     // Jump instantly to real first slide
    //     setTimeout(() => {
    //       setIsTransitioning(false);
    //       setCurrentSlide(1);
    //     }, 1800);
    //   }

    //   if (Math.abs(currentSlide) === 0) {
    //     // Jump instantly to real last slide
    //     setTimeout(() => {
    //       setIsTransitioning(false);
    //       setCurrentSlide(extendedCarouselData.length - 2);
    //     }, 1800);
    //   }

    // }, [currentSlide])

  
    useEffect(() => {
      if ((Math.abs(currentSlide) + 1) > carouselData.length ) {
        // const dataFromStart = carouselData.shift()
        // carouselData[carouselData.length] = dataFromStart
        setCurrentSlide(0)
      }
      if ((currentSlide - 1) === 0 ) {
        // const dataFromEnd = carouselData.pop()
        // carouselData.unshift(dataFromEnd)
        setCurrentSlide(0 - (carouselData.length - 1))
      }
    }, [currentSlide])

    console.log( " Carousel last element ",carouselData.length - 1)
    console.log(carouselData)
    console.log(" CurrentSlide ", Math.abs(currentSlide))
  
  
    useEffect(() => {
      const observers: IntersectionObserver[] = [];
  
      navItems.forEach((obj) => {
          const el = document.getElementById(obj.id);
          if (!el) return;
  
          const observer = new IntersectionObserver(
              ([entry]) => {
                  if (entry.isIntersecting) {
                      setActiveSection(obj.id);
                  }
              },
              {
                  root: null,
                  threshold: 0.5, // section is 50% in view
              }
          );
  
          observer.observe(el);
          observers.push(observer);
      });
  
      return () => observers.forEach((observer) => observer.disconnect());
    }, []);
    return(
        <div className=" relative w-screen h-fit overflow-x-hidden group ">
          <ul 
            className={` flex w-fit h-[80dvh] transition-all ease-in-out duration-[1.8s] ${isTransitioning ? "no-transition" : "" } `}
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
                        className={` absolute w-full flex flex-col gap-3 px-3 text-black justify-center items-center top-[30%] translate-y-[-50%] ${Math.abs(currentSlide) === idx ? "max-w-full" : "max-w-0"} transition-all ease-in-out duration-[1.5s] `} 
                        initial={{opacity: 0, y: 50}}              
                        animate={Math.abs(currentSlide) === idx ? {opacity: 1, y: 0}: {}}
                        transition={{duration: 0.4, ease: "easeInOut", delay: 2}}
                      >
                        <motion.p
                          className=" rounded-2xl px-4 py-2 text-white text-[14px] mobile:text-[18px] md:text-[26px] bg-black bg-opacity-50 "
                          initial={{x: -90, opacity:0}}
                          animate={Math.abs(currentSlide) === idx ? {opacity: 1, x: 0} : {}}
                          transition={{duration: .6, ease: "easeInOut", delay: .8}}
                        >
                          BEST EDUCATION
                        </motion.p>
                        <motion.h1
                          className=" text-[20px] mobile:text-[30px] md:text-[45px] text-white bg-black bg-opacity-50 px-4 py-2 rounded-2xl "
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

export default Carousel;