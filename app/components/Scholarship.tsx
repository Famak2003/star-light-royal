

import { motion } from "framer-motion";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react";
import { useInView } from "react-intersection-observer";

const scholarshipTypes = [
    {
        header: "Special Talent Awards",
        type: "small",
        text: "Granted to students with exceptional abilities in music, arts, sports, public speaking, or science innovation, encouraging the development of non-academic talents."
    },
    {
        header: "Merit-Based Scholarships",
        type: "medium",
        text: "Awarded to students who perform exceptionally well in the Entrance Examination, internal assessments, or recognized competitions."
    },
    {
        header: "Need-Based Scholarships",
        type: "medium",
        text: "Offered to students from economically disadvantaged backgrounds who demonstrate academic promise and a strong work ethic."
    },
    {
        header: "Orphan Scholarship",
        type: "medium",
        text: "Full or partial scholarships are available for orphans or students under guardianship, as part of our social responsibility and support for vulnerable children."
    },
    {
        header: "Staff Children Scholarship",
        type: "medium",
        text: "Children of full-time staff members are eligible for subsidized tuition as a token of appreciation and commitment to staff welfare."
    },
    {
        header: "Multiple-Ward Support",
        type: "small",
        text: "Families with four (4) or more children enrolled in the school may benefit from a special discount or partial scholarship on one or more wards, to ease the financial burden."
    },    
]


const eligibilityRequirements = [
    "Must be a registered applicant or current student of Starlight Royal Model Schools",
    "Submission of relevant documents (e.g., academic records, proof of guardianship, financial statements, or staff ID)",
    "A letter of application stating the type of scholarship and reason for request",
    "Interview or further assessment (if required)"
]

const Scholarship = () => {

    return (
        <div className=" section ">
            <div className=" flex flex-col gap-2 max-w-mx-width ">
                <h1 className=" sectionHeader ">
                    <span className=" border-secondary border-b-4 ">Scholarships</span>
                </h1>
                <p className=" sectionWriteup ">
                    At Starlight Royal Model Schools, we are committed to making quality education accessible to all, especially students who show potential but may face financial or personal barriers. Our scholarship and support schemes are designed to reward excellence, recognize special circumstances, and encourage commitment to learning.
                </p>
                <ul className=" DisableScrollBar overflow-auto columns-1 mobile:columns-2 md:columns-3 gap-2 h-fit md:max-h-[790px] w-full overflow-x-hidden duration-700 transition-all " >
                    {
                        scholarshipTypes.map((obj, idx) => {
                            const [ref, inView] = useInView({
                                threshold: window.innerWidth < 768 ? 0.15 : 0.3,
                                triggerOnce: true
                            })
                            const height = (idx % 6 === 0 || idx % 6 === 3 || idx % 6 === 4)
                                ? "small" // small
                                : "big" // big
                            return (
                                <motion.li
                                    ref={ref}
                                    initial={{opacity: 0, zIndex: 0, y: 100}}
                                    animate={inView ? {opacity: 1, zIndex: 1, y: 0} : {}}
                                    transition={{duration: .14 * idx, ease: "easeInOut"}}
                                    key={idx} 
                                    style={{height}}
                                    className={` relative flex flex-col gap-4 my-4 p-4 rounded-lg bg-accent bg-opacity-50 text-white ${height === "small" ? "h-[300px] hover:!h-[310px]" : "h-[450px] "} w-full sm:max-w-[380px] duration-700 transition-all `}
                                >
                                    <h2 className=" text-[20px] md:text-[25px] text-white font-semibold ">
                                        {obj.header}
                                    </h2>
                                    <p className=" text-[14px] text-black ">
                                        {obj.text}
                                    </p>
                                    <button className=" group absolute bottom-10 left-3 flex items-center gap-2 px-2 py-1 w-fit ring-1 rounded-lg ring-primary hover:ring-white duration-700 transition-all " >
                                        <p className=" text-[14px] text-black group-hover:text-white italic ">Learn more</p>
                                        <FontAwesomeIcon className=" text-black group-hover:text-white " icon={faArrowRight} /> 
                                    </button>
                                </motion.li>
                            )
                        })
                    }
                </ul>
                <h1 className=" sectionSecHeader " >
                    <span className=" border-secondary border-b-4 ">Eligibility</span>
                    <span className="  ">Requirements</span>                 
                </h1>
                <ul className=" sectionBulletPoint ">
                    {
                        eligibilityRequirements.map((item, idx) => {
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
    )
}

export default Scholarship