import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UploadFile } from "antd"
import React from "react"

interface data {
    writeup: { __html: string | TrustedHTML; }
    image: UploadFile<any>[]
}

interface CarouselCardType {
    setState: (value: boolean) => void,
    data: data
    idx: number
}

const CarouselCard: React.FC<CarouselCardType> = ({setState, data, idx}) => {
    return(
        <li key={idx} className=" relative overflow-hidden bg-white dark:bg-dark_side rounded-lg h-[200px] sm:h-[250px] md:h-[300px] min-w-[350px] sm:min-w-[400px] md:min-w-[500px] aspect-video duration-300 transition-all shadow-custom_shad5 ">
            <img className=" w-full h-full object-cover " src={"/Assets/mountain2.jpg"} />
            <div 
                className=" cursor-pointer absolute top-0 h-full w-full flex flex-col gap-2 justify-center items-center text-white "
                onClick={() => setState(true)}
            >
                <FontAwesomeIcon className=" italic text-[15px] " icon={faPlus} />
                <div dangerouslySetInnerHTML={data?.writeup} className=" italic text text-center font-semibold "/>                
            </div>
        </li>
    )
}

export default CarouselCard