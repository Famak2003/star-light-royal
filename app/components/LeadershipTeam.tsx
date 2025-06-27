import { faEraser, faFaceAngry, faLink, faX } from "@fortawesome/free-solid-svg-icons"
import { faInstitution } from "@fortawesome/free-solid-svg-icons/faInstitution"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {motion} from "framer-motion"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

const ex1 = "/Assets/ex1.jpg"

const team = [
    {
        name: "Mr. Barth Duwa",
        image: ex1,
        position: "Chairman, Board of Trustees / Proprietor",
        writeup: "Provides strategic leadership, vision, and overall direction for the school’s growth and sustainability.",
        socials: [
            {
                name: "linkedin",
                link: "linkedin.com"
            },
            {
                name: "instagram",
                link: "instagram.com"
            },
            {
                name: "X",
                link: "X.com"
            },
            {
                name: "facebook",
                link: "facebook.com"
            },

        ]
    },
    {
        name: "Mr. Barth Duwa",
        image: ex1,
        position: "Chairman, Board of Trustees / Proprietor",
        writeup: "Provides strategic leadership, vision, and overall direction for the school’s growth and sustainability.",
        socials: [
            {
                name: "linkedin",
                link: "linkedin.com"
            },
            {
                name: "instagram",
                link: "instagram.com"
            },
            {
                name: "X",
                link: "X.com"
            },
            {
                name: "facebook",
                link: "facebook.com"
            },

        ]
    },
    {
        name: "Mr. Barth Duwa",
        image: ex1,
        position: "Chairman, Board of Trustees / Proprietor",
        writeup: "Provides strategic leadership, vision, and overall direction for the school’s growth and sustainability.",
        socials: [
            {
                name: "linkedin",
                link: "linkedin.com"
            },
            {
                name: "instagram",
                link: "instagram.com"
            },
            {
                name: "X",
                link: "X.com"
            },
            {
                name: "facebook",
                link: "facebook.com"
            },

        ]
    },
    {
        name: "Mr. Barth Duwa",
        image: ex1,
        position: "Chairman, Board of Trustees / Proprietor",
        writeup: "Provides strategic leadership, vision, and overall direction for the school’s growth and sustainability.",
        socials: [
            {
                name: "linkedin",
                link: "linkedin.com"
            },
            {
                name: "instagram",
                link: "instagram.com"
            },
            {
                name: "X",
                link: "X.com"
            },
            {
                name: "facebook",
                link: "facebook.com"
            },

        ]
    },
]

const LeadershipTeam = () => {
    // const ref = useRef(null);
    // const inView = useInView(ref, {once: true})

    // useEffect(() => {
    //     console.log("Element is in view: ", inView)
    // }, [inView])

    return(
        <div className=" section " >
            <div className=" flex flex-col gap-8 max-w-mx-width ">
                <div className=" flex flex-col gap-2 w-full ">
                    <h1 className="sectionHeader">
                        <span className="  ">Leadership</span>
                        <span className="  border-secondary font-bold border-b-4  ">Team</span>
                    </h1>
                    <p className=" sectionWriteup ">
                        At Starlight Royal Model Schools, our leadership team is made up of committed and visionary professionals who bring a wealth of experience in education, administration, and student development. They are united by a shared goal: to nurture excellence, discipline, and integrity in every learner.
                    </p>
                </div>
                <ul className=" flex flex-wrap tab:flex-nowrap gap-4 justify-center tab:justify-between items-center w-full max-w-mx-width text-black ">
                    {
                        team.map((obj, idx) => {
                            const [ref, inView] = useInView({
                                threshold: window?.innerWidth < 768 ? 0.15 : 0.3, // adjusted threshold visibility for smaller screens from 768 below
                                triggerOnce: true
                            })
                            return(
                                <motion.li
                                    ref={ref}
                                    key={idx}
                                    initial={{opacity: 0, y: 100}}
                                    animate={inView ? {opacity: 1, y: 0} : {}}
                                    transition={{duration: .14 * idx, ease: "easeInOut"}}
                                    className=" group flex flex-col gap-2 rounded-lg overflow-hidden max-w-[292px] bg-gray-100 hover:shadow-2xl shadow-xl pb-3 border-primary border-b-[1px] duration-700 transition-all "
                                >
                                    <figure className=" w-full h-[70%] overflow-hidden " >
                                        <Image className=" object-cover w-full h-full group-hover:scale-105 duration-700 transition-all " width={292} height={262} src={ex1} alt={"Team"} />
                                    </figure>
                                    <div className=" flex flex-col gap-1 px-2  ">
                                        <h1 className=" text-[18px] ">
                                            Mr. Barth Duwa
                                        </h1>
                                        <p className=" text-[14px] ">
                                            Chairman, Board of Trustees / Proprietor
                                        </p>
                                        <p className=" italic text-[12px] text-gray-400 group-hover:text-gray-600 duration-700 transition-all ">
                                            Provides strategic leadership, vision, and overall direction for the school’s growth and sustainability.
                                        </p>
                                        <ul className=" flex justify-center items-center gap-3 mt-2 ">
                                            {
                                                obj.socials.map((item, index) => {
                                                    switch (item.name) {
                                                        case "X":
                                                            return(
                                                                <li key={index} className=" flex justify-center items-center cursor-pointer w-[40px] aspect-square rounded-lg hover:rounded-xl bg-accent text-white hover:text-gray-200 duration-300 transition-all ">
                                                                    <FontAwesomeIcon icon={faX} />
                                                                </li>   
                                                            )
                                                        case "linkedin":
                                                            return(
                                                                <li key={index} className=" flex justify-center items-center cursor-pointer w-[40px] aspect-square rounded-lg hover:rounded-xl bg-accent text-white hover:text-gray-200 duration-300 transition-all ">
                                                                    <FontAwesomeIcon icon={faLink} />
                                                                </li>     
                                                            )
                                                        case "instagram":
                                                            return(
                                                                <li key={index} className=" flex justify-center items-center cursor-pointer w-[40px] aspect-square rounded-lg hover:rounded-xl bg-accent text-white hover:text-gray-200 duration-300 transition-all ">
                                                                    <FontAwesomeIcon icon={faInstitution} />
                                                                </li>      
                                                            )
                                                        case "facebook":
                                                            return(
                                                                <li key={index} className=" flex justify-center items-center cursor-pointer w-[40px] aspect-square rounded-lg hover:rounded-xl bg-accent text-white hover:text-gray-200 duration-300 transition-all ">
                                                                    <FontAwesomeIcon icon={faFaceAngry} />
                                                                </li>      
                                                            )
                                                    
                                                        default:
                                                            return(
                                                                <li>
                                                                    <FontAwesomeIcon icon={faEraser} />
                                                                </li>
                                                            )
                                                    }
                                                })
                                            }
                                        </ul>
                                    </div>
                                </motion.li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default LeadershipTeam