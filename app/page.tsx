"use client"

import { motion, useInView } from "framer-motion";
import { faAngleLeft, faAngleRight, faArrowAltCircleLeft, faArrowAltCircleRight, faArrowLeft, faArrowRight, faClockFour, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navigation from "./components/Navigation";

const BACKGROUND1 = "./Assets/bg1.jpeg"
const BACKGROUND2 = "./Assets/bg2.jpeg"
const BACKGROUND3 = "./Assets/bg3.jpeg"
const BACKGROUND4 = "./Assets/bg4.jpeg"
const BACKGROUND5 = "./Assets/bg5.jpeg"

const ex1 = "./Assets/ex1.jpg"
const ex2 = "./Assets/ex2.jpeg"


const Logo = "/Assets/logo.jpeg"

const carouselData = [
  {
    bgimage: ex1,
  },
  {
    bgimage: ex2,
  },
  {
    bgimage: ex1,
  },
  {
    bgimage: ex2,
  },
  {
    bgimage: ex1,
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

const leaderShipArr = [
    "Chairman, Board of Trustees / Proprietor: Mr. Barth DuwaProvides strategic leadership, vision, and overall direction for the school’s growth and sustainability.",
    "Director / Vice Chairman: Assist. Prof. Dr. Basil B. DuwaOversees policy implementation, strategic planning, and academic advancement across all school divisions.",
    "Administrative Officer: Mr. Innocent LoriManages day-to-day school operations, coordinates internal processes, and supports effective communication across departments.",
    "Principal – Starlight Royal College: [Name to be provided]Leads the secondary school division, ensuring academic excellence and strong student mentorship.",
    "Head Teacher – Starlight Royal International (Nursery & Primary): Mrs. RahabSupervises the nursery and primary school section, promoting early learning, creativity, and foundational character building.",
    "Academic Coordinator: [Name to be provided]Monitors curriculum delivery, supports teachers, and upholds academic standards and performance.",
    "Examination Officer: [Name to be provided]Coordinates internal and external examinations, ensures integrity in assessment, and manages academic records.",
  ]

export default function Home() {
  const slideRef = useRef(null)
  const [activeSection, setActiveSection] = useState<string>("")
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const hanldeSlider = (operation: number) => {
    setCurrentSlide((prev: any) => {
      return prev += operation
    })
  }

  useEffect(() => {
    if ((Math.abs(currentSlide) + 1) > carouselData.length ) {
      setCurrentSlide(0)
    }
    if ((currentSlide - 1) === 0 ) {
      setCurrentSlide(0 - (carouselData.length - 1))
    }
  }, [currentSlide])


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

  console.log(activeSection)
  // console.log(Math.abs(currentSlide) + 1 > carouselData.length ? `Shoudl still work ${Math.abs(currentSlide) + 1 }` : "working")
  console.log(currentSlide, carouselData.length)

  return (
    <div className="">
        <main className=" flex flex-col px-4 bg-white " >
            <Navigation activeSection={activeSection}/>
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
                                >
                                    FOR YOUR BETTER FUTURE
                                </motion.h1>
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
            <div className=" flex flex-col gap-2 ">
                <h1 className=" text-[32px] text-headerColor ">
                    <span className=" border-secondary border-b-4 ">About</span>  <span className=" text-primary font-bold ">Us</span>
                </h1>
                <div>
                    <h2 className=" text-[24px] text-primary ">
                    History
                    </h2>
                    <p className=" text-[14px] text-textColor ">
                    Starlight Royal Model Schools is a distinguished private educational institution located in Mubi North Local Government Area of Adamawa State, Nigeria. Officially registered and established in September 2014, the school was formally commissioned on February 20, 2015. Since its inception, it has stood as a beacon of academic excellence, character formation, and disciplined learning in the North East geopolitical zone.
                    Founded with a strong commitment to modern, values-based education, Starlight Royal Model Schools was established to meet the growing demand for quality education that integrates intellectual development with moral and ethical training. The school is built on the core principles of discipline, justice, and equity, which guide its policies, teaching approach, and day-to-day operations.
                    Our mission is to foster an enabling environment where students are nurtured not only to excel academically but also to grow into responsible, well-rounded individuals equipped to face the challenges of the modern world. We are passionate about shaping future leaders by offering a holistic educational experience rooted in integrity, excellence, and respect for all.
                    Starlight Royal Model Schools continues to be a transformative force in the region, striving to raise a new generation of students who are knowledgeable, principled, and driven by purpose.
                    </p>
                </div>
                <div className=" flex flex-col gap-2 text-textColor" >
                    <h2 className=" text-[24px] text-primary mb-2 ">
                    Leadership Team
                    </h2>
                    <p>
                    At Starlight Royal Model Schools, our leadership team is made up of committed and visionary professionals who bring a wealth of experience in education, administration, and student development. They are united by a shared goal: to nurture excellence, discipline, and integrity in every learner.
                    </p>
                    <ul className=" list-disc pl-6 ">
                    {
                        leaderShipArr.map((item, idx) => {
                        return(
                            <li key={idx}>
                            {item}
                            </li>
                        )
                        })
                    }
                    </ul>
                </div>
            </div>
        </main>
    </div>
  );
}
