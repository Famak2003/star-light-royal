import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

interface CarouselDefaultCardType {
    setState: (value: boolean) => void,
    idx: number
}

const CarouselDefaultCard: React.FC<CarouselDefaultCardType> = ({setState, idx}) => {
    return(
        <li key={idx} className=" relative overflow-hidden bg-white dark:bg-dark_side rounded-lg h-[200px] sm:h-[250px] md:h-[300px] min-w-[350px] sm:min-w-[400px] md:min-w-[500px] aspect-video duration-300 transition-all shadow-custom_shad5 ">
            <img className=" w-full h-full object-cover " src={"/Assets/mountain2.jpg"} />
            <div 
                className=" cursor-pointer absolute top-0 h-full w-full flex flex-col gap-2 justify-center items-center text-white "
                onClick={() => setState(true)}
            >
                <FontAwesomeIcon className=" italic text-[15px] " icon={faPlus} />
                <p className=" italic text  ">
                    Add carousel data
                </p>
            </div>
        </li>
    )
}

export default CarouselDefaultCard