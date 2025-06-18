"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import CreateOurTeam from "../components/CreatOurTeam"

const OurTeam = () => {
    const [isCreateModalVisible, setisCreateModalVisible] = useState(false)
    return (
        <div className=" dashboardPages " >
            <ul className="  " >
                <li className=" group flex flex-col gap-3 w-fit items-center " >
                    <div
                        onClick={() => {
                            return setisCreateModalVisible(true)
                        }} 
                        className="  flex flex-col gap-1 justify-center items-center bg-white dark:bg-dark_side rounded-xl group-hover:bg-hightlight cursor-pointer h-[300px] w-[256px] duration-300 transition-all shadow-custom_shad5 " >
                        <FontAwesomeIcon className=" font-thin group-hover:text-white " icon={ faPlus } />
                    </div>
                    <span className=" italic text group-hover:text-gray-500 ">Add members of the team</span>
                </li>
            </ul>
            <CreateOurTeam isModalVisible={isCreateModalVisible} setisModalVisible={setisCreateModalVisible}  />
            
        </div>
    )
}

export default OurTeam