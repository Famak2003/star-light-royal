"use client"

import { motion, useInView } from "framer-motion";
import { faAngleLeft, faAngleRight, faArrowAltCircleLeft, faArrowAltCircleRight, faArrowLeft, faArrowRight, faClockFour, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import LeadershipTeam from "./components/LeadershipTeam";
import Scholarship from "./components/Scholarship";
import OurCurriculum from "./components/OurCurriculum";

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

const ourSchoolArr = [
    "Starlight Royal International (Nursery and Primary School)This foundation arm of the school provides a warm, nurturing, and intellectually stimulating environment for young learners. With a focus on early childhood education, Starlight Royal International lays the groundwork for academic success and character development. The curriculum is enriched with creative activities, literacy, numeracy, and moral instruction to help children grow into confident and well-rounded individuals.",
    "Starlight Royal College (Secondary School)Designed to prepare students for higher education and responsible citizenship, Starlight Royal College offers a well-structured academic program that emphasizes excellence, discipline, and critical thinking. With dedicated teachers, modern teaching methods, and a values-based learning environment, the college equips students with the knowledge, skills, and character to thrive in a competitive and evolving world."
]

const headOfSchools = [
    "Principal – Starlight Royal College (Secondary School): [Name to be provided]The Principal oversees all academic and administrative activities at the secondary school level, ensuring a disciplined and enriching environment that prepares students for higher education and life challenges.",
    "Head Teacher – Starlight Royal International (Nursery & Primary): Mrs. RahabMrs. Rahab leads the nursery and primary school division with a focus on early childhood learning, foundational education, and moral development. Her leadership ensures that every child receives quality care and instruction during their most formative years."
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
    <div className="w-screen">
        <main className=" flex flex-col h-fit bg-transparent w-[100vw] " >
            <Navigation activeSection={activeSection}/>
            <div className=" flex flex-col gap-4 h-fit w-full ">
                <Carousel/>                
                <div className=" sectionGroup px-4 !bg-transparent ">
                    <div className=" flex flex-col gap-2 max-w-mx-width ">
                        <h1 className=" sectionHeader ">
                            <span className=" border-secondary border-b-4 ">About</span>  <span className=" text-primary font-bold ">Us</span>
                        </h1>
                        <div className="section">
                            <div className=" flex flex-col gap-2 max-w-mx-width ">
                                <h2 className=" sectionSecHeader ">
                                    History
                                </h2>
                                <p className=" sectionWriteup ">
                                    Starlight Royal Model Schools is a distinguished private educational institution located in Mubi North Local Government Area of Adamawa State, Nigeria. Officially registered and established in September 2014, the school was formally commissioned on February 20, 2015. Since its inception, it has stood as a beacon of academic excellence, character formation, and disciplined learning in the North East geopolitical zone.
                                    Founded with a strong commitment to modern, values-based education, Starlight Royal Model Schools was established to meet the growing demand for quality education that integrates intellectual development with moral and ethical training. The school is built on the core principles of discipline, justice, and equity, which guide its policies, teaching approach, and day-to-day operations.
                                    Our mission is to foster an enabling environment where students are nurtured not only to excel academically but also to grow into responsible, well-rounded individuals equipped to face the challenges of the modern world. We are passionate about shaping future leaders by offering a holistic educational experience rooted in integrity, excellence, and respect for all.
                                    Starlight Royal Model Schools continues to be a transformative force in the region, striving to raise a new generation of students who are knowledgeable, principled, and driven by purpose.
                                </p>
                            </div>
                        </div>
                        <LeadershipTeam/>
                    </div>
                </div>
                <div className="section">
                    <div className=" flex flex-col gap-2 max-w-mx-width ">
                        <h1 className="sectionHeader">
                            <span className=" text-primary  ">Our</span>
                            <span className=" border-secondary font-bold border-b-4 ">School</span>
                        </h1>
                        <p className=" sectionWriteup ">
                            Starlight Royal Model Schools is structured into two distinct but complementary institutions, each tailored to meet the academic and developmental needs of learners at different stages:
                        </p>
                        <ul className=" sectionBulletPoint ">
                            {
                                ourSchoolArr.map((item, idx) => {
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
                <div
                    id="head-of-school" 
                    className=" section "
                >
                    <div className="flex flex-col gap-2 max-w-mx-width">
                        <h1 className="sectionHeader">
                            <span className="  border-secondary font-bold border-b-4  ">Head</span>
                            <span className="  ">of</span>
                            <span className="  ">Schools</span>
                        </h1>
                        <p className=" sectionWriteup ">
                            Our school is led by passionate and experienced educators who bring vision, dedication, and a deep commitment to academic excellence and student development.
                        </p>
                        <ul className=" sectionBulletPoint ">
                            {
                                headOfSchools.map((item, idx) => {
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
                <OurCurriculum/>
                <Scholarship/>                
                <Footer/>
            </div>
        </main>
    </div>
  );
}
