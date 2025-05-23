import { faClockFour, faPhoneAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

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
    return (
        <nav className=" w-full flex flex-col justify-center items-center ">
          <div className=" flex justify-center items-center h-[80px] px-2 w-full ">
            <div className=" flex justify-between items-center h-full w-full max-w-[1170px]  ">
              <figure className=" flex justify-center items-center w-[60px] aspect-square rounded-lg overflow-hidden " >
                <Image className="  " width={ 60 } height={ 60 } alt="star light royal logo " src={Logo} />
              </figure>
              <div className=" flex gap-6 justify-between items-center  ">
                <div className=" flex items-center gap-4 " >
                  <span className=" flex justify-center items-center bg-secondary rounded-lg p-1 aspect-square h-[42px] ">
                    <FontAwesomeIcon className=" rotate-90 text-[24px] " icon={ faPhoneAlt } />
                  </span>
                  <div>
                    <p className=" text-[12px] text-gray-500  ">CALL US TODAY!</p>
                    <p className=" text-primary font-extralight text-[14px] " >+23 4234 567 890</p>
                  </div>
                </div>
                <div className=" flex items-center gap-4 " >
                  <span className=" flex justify-center items-center bg-secondary rounded-lg p-1 aspect-square h-[42px] ">
                    <FontAwesomeIcon className=" text-[24px] " icon={ faClockFour } />
                  </span>
                  <div>
                    <p className=" text-[12px] text-gray-500  ">WE'RE OPEN!</p>
                    <p className=" text-primary font-extralight text-[14px] " >Mon-Fri 8:00-6:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center w-full h-fit min-h-[72px] bg-accent">
            <ul className=" flex flex-wrap items-center gap-2 max-w-mx-width  ">
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
          </div>
        </nav>
    )
}

export default Navigation