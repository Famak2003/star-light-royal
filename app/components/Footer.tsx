import { faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

const Logo = "/Assets/logo.jpeg"
const ex1 = "/Assets/ex1.jpg"
const BACKGROUND2 = "./Assets/bg2.jpeg"

const navItems1 = [
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
]

const navItems2 = [
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

const Footer = () => {
    return (
        <footer 
            className=" relative flex justify-center bg-black bg-opacity-50 text-[14px] w-full h-fit min-h-[500px] text-gray-400 px-4  "
            style={{
                backgroundImage: `url(${BACKGROUND2})`,
            }}
            id="slideEffect"
        >
            <div className=" absolute w-full h-full bg-black bg-opacity-70 z-10 " />
            <div className=" grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 place-items-center justify-center gap-5 xl:gap-10 py-10 my-5 w-full h-fit max-w-[1170px] z-20 border-gray-600 border-b-[1px] ">
                <div className=" footerGroup ">
                    <figure className=" w-[70px] h-[70px] rounded-full overflow-hidden ">
                        <Image className=" object-cover h-full w-full " width={70} height={70} src={ex1} alt="star light royal logo" />
                    </figure>
                    <div className=" flex flex-col gap-2 ">
                        <p>
                            STAR LIGHT ROYAL, Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        </p>
                        <div>
                            <span><FontAwesomeIcon className=" text-secondary " icon={faPhone} /></span>
                            <a className=" cursor-pointer hover:text-blue-500 hover:underline duration-300 transition-all " href="tel:+2348037127602">+(234) 803 712 7602</a>                    
                        </div>
                        <div>
                            <span><FontAwesomeIcon className=" text-secondary " icon={faMailBulk} /></span>
                            <a className=" cursor-pointer hover:text-blue-500 hover:underline duration-300 transition-all " href="mailto:starlightroyal@gmail.com">starlightroyal@gmail.com</a>                    
                        </div>
                    </div>
                </div>
                <div className=" footerGroup ">
                    <h1 className=" text-white text-[18px] ">
                        Useful Links
                    </h1>
                    <ul className=" flex flex-col gap-2 ">
                        {
                            navItems1.map((obj, idx) => {
                                return(
                                    <Link key={idx} href={`${obj.id}`} >
                                        <li
                                            key={idx}
                                            className=" cursor-pointer border-gray-600 border-b-[1px] border-dashed p-2 ">
                                            {obj.name}
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className=" footerGroup ">
                    <h1 className=" text-white text-[18px] ">
                        Useful Links
                    </h1>
                    <ul className=" flex flex-col gap-2 ">
                        {
                            navItems2.map((obj, idx) => {
                                return(
                                    <Link key={idx} href={`${obj.id}`} >
                                        <li key={idx} className=" cursor-pointer border-gray-600 border-b-[1px] border-dashed p-2 ">
                                            {obj.name}
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className=" footerGroup ">
                    <h1 className=" text-white text-[18px] ">
                        Opening Hours
                    </h1>
                    <ul className=" flex flex-col gap-2 ">
                        <li className=" flex justify-between items-center border-gray-600 border-b-[1px] border-dashed p-2 ">
                            <p>Mon - Fri</p>
                            <p>
                                7.00am - 4.00pm
                            </p>
                        </li>
                        <li className=" flex justify-between items-center border-gray-600 border-b-[1px] border-dashed p-2 ">
                            <p>
                                Sat:
                            </p>
                            <p>
                                Closed
                            </p>
                        </li>
                        <li className=" flex justify-between items-center border-gray-600 border-b-[1px] border-dashed p-2 ">
                            <p>
                                Sat:
                            </p>
                            <p>
                                Closed
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className=" group z-30 absolute bottom-0 flex gap-1 justify-end items-center w-full h-[30px] px-5 bg-black ">
                <p className=" transition-all duration-500 text-gray-300 text-[12px] ">
                    Powered by
                </p>
                <span className=" transition-all duration-500 group-hover:animate-pulse group-hover:text-red-500 font-bold text-red-600 text-[13px] cursor-pointer ">Famakinde</span>
            </div>
        </footer>
    )
}

export default Footer