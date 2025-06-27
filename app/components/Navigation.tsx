import { faClockFour, faPhoneAlt } from "@fortawesome/free-solid-svg-icons"
import { faHamburger } from "@fortawesome/free-solid-svg-icons/faHamburger"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const Logo = "/Assets/logo.jpeg"

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

const Navigation = ({activeSection}: {activeSection: string}) => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  console.log(isNavOpen)
    return (
        <nav className=" w-full flex flex-col justify-center items-center ">
            <div className=" flex justify-center items-center min-h-[80px] px-2 w-full ">
                <div className=" flex flex-col mobile:flex-row gap-3 py-2 mobile:py-0 justify-between items-center h-full w-full max-w-[1170px]  ">
                  <figure className=" flex justify-center items-center w-[50px] md:w-[60px] aspect-square rounded-lg overflow-hidden " >
                      <Image className="  " width={ 60 } height={ 60 } alt="star light royal logo " src={Logo} />
                  </figure>
                  <div className=" flex flex-col mobile:flex-row gap-3 mobile:gap-6 justify-between items-center  ">
                      <div className=" flex items-center gap-2 md:gap-4 " >
                      <span className=" flex justify-center items-center bg-secondary rounded-lg p-1 aspect-square h-[28px] md:h-[42px] ">
                          <FontAwesomeIcon className=" rotate-90 text-[16px] text-white lg:text-[24px] " icon={ faPhoneAlt } />
                      </span>
                      <div>
                          <p className=" text-[10px] md:text-[12px] text-gray-500  ">CALL US TODAY!</p>
                          <p className=" text-primary font-extralight text-[12px] md:text-[14px] " >+23 4234 567 890</p>
                      </div>
                      </div>
                      <div className=" flex items-center gap-4 " >
                      <span className=" flex justify-center items-center bg-secondary rounded-lg p-1 aspect-square h-[28px] md:h-[42px] ">
                          <FontAwesomeIcon className=" text-[16px] lg:text-[24px] text-white " icon={ faClockFour } />
                      </span>
                      <div>
                          <p className=" text-[12px] text-gray-500  ">WE'RE OPEN!</p>
                          <p className=" text-primary font-extralight text-[14px] " >Mon-Fri 8:00-6:00</p>
                      </div>
                      </div>
                  </div>
                </div>
            </div>
            <div className=" relative flex justify-center items-center w-full h-fit min-h-[72px] bg-accent">
                <ul className={` ${isNavOpen ? "max-h-[500px] sm:max-h-fit" : "max-h-0 sm:max-h-fit "} flex flex-col justify-center sm:flex-row w-full h-[400px] sm:h-full overflow-y-scroll sm:overflow-y-auto max-w-mx-width gap-2 flex-wrap items-center duration-700 transition-all `}>
                  {
                      navItems.map((obj, idx) => {
                      return (
                          <Link key={idx} href={obj.id} >
                          <li className={` text-[14px] ${activeSection === obj.id ? "bg-white text-secondary" : "text-white"}  rounded-2xl py-1 px-2 `} >
                              {obj.name}
                          </li>
                          </Link>
                      )
                      })
                  }
                </ul>
                <button 
                    className=" absolute sm:hidden top-[30px] right-3 "
                    onClick={() => (
                        setIsNavOpen(!isNavOpen)
                    )}
                >
                <div className={` flex flex-col self-end ${isNavOpen ? "gap-0" : "gap-1"} duration-500 transition-all  `}>
                    <hr className={` w-5 border-[1px] border-white ${isNavOpen ? "rotate-45" : "rotate-0"} `} />
                    <hr className={` w-5 border-[1px] border-white ${isNavOpen ? "hidden" : "block"}  `} />
                    <hr className={` w-5 border-[1px] border-white ${isNavOpen ? "rotate-[135deg]" : "rotate-0"} `} />
                </div>
                </button>
            </div>
        </nav>
    )
}

export default Navigation