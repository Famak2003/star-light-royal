import { faSmileBeam } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const primaryCurriculum = [
    "English Language",
    "Mathematics",
    "Literacy and Numeracy",
    "Basic Science and Technology",
    "Civic and Moral Education",
    "Verbal and Quantitative Reasoning",
    "Creative Arts, Music, and Handwriting",
    "Health and Physical Education"
]


const secondaryCurriculum = [
    "Core Subjects: English Language, Mathematics, Basic/General Science, Civic Education, and Social Studies",
    "Sciences: Physics, Chemistry, Biology, Agricultural Science",
    "Arts and Humanities: Literature in English, Government, History, CRS/IRS",,
    "Languages: French, Hausa, and other Nigerian languages",
    "Vocational and Technical: Home Economics, Business Studies, Computer Studies, Trade/Entrepreneurship"
]

const OurCurriculum = () => {
    return (
        <div className=" section ">
            <div className=" flex flex-col gap-2 max-w-mx-width ">
                <h1 className=" sectionHeader ">
                    <span className="  ">Our</span>
                    <span className=" border-secondary border-b-4 ">Curriculum</span>                
                </h1>
                <div className=" flex flex-col gap-4 justify-center ">
                    <h1 className=" sectionSecHeader " >
                        Nursery & Primary (Starlight Royal International)
                    </h1>
                    <p className=" w-full ">
                        At Starlight Royal Model Schools, we offer a well-rounded and dynamic curriculum that blends the Nigerian National Curriculum with essential global best practices to prepare our students for academic success, personal development, and global relevance.
                        Our curriculum is designed to promote not just intellectual growth, but also character, creativity, and leadership. It is delivered through interactive teaching methods, hands-on learning, and continuous assessment—ensuring that every learner reaches their full potential.                         
                    </p>
                    <ul className=" flex flex-wrap justify-center items-center gap- w-fit ">
                        {
                            primaryCurriculum.map((item, idx) => {
                                // ? "small" // small
                                const size = idx % 2 ? "small" : "big"
                                return(
                                    <li className={` relative flex justify-center items-end my-2 ${ size === "small" ? "rotate-6 bg-secondary z-10 " : "-rotate-6 bg-primary z-20 " } hover:rotate-0 hover:z-30 w-[150px] aspect-square p-2 text-white rounded-lg duration-500 transition-all `}  key={idx}>
                                        <p className=" text-[14px] ">
                                            {item}
                                        </p>
                                        <FontAwesomeIcon className=" absolute top-3 right-3 text-white text-[15px] " icon={faSmileBeam} />
                                    </li>
                                )
                            })
                        }
                    </ul>    
                    <p className=" w-full ">
                        We use age-appropriate learning strategies including phonics, storytelling, play-based learning, and continuous feedback to ensure strong foundational skills and love for learning.
                    </p>                
                </div>
                <div className=" flex flex-col gap-4 justify-center ">
                    <h1 className=" sectionSecHeader " >
                        Secondary (Starlight Royal College)
                    </h1>
                    <p className=" w-full ">
                        Our secondary school curriculum prepares students for national examinations (BECE, WAEC, NECO) and includes:
                    </p>
                    <ul className=" sectionBulletPoint ">
                        {
                            secondaryCurriculum.map((item, idx) => {
                                return(
                                    <li key={idx}>
                                        {item}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p>
                        We also integrate 21st-century skills such as digital literacy, problem-solving, communication, and critical thinking across all levels.
                    </p>

                </div>
            </div>
        </div>
    )
}

export default OurCurriculum