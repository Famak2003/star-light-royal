"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import AddSystemInfo from "../components/reuseable/AddSystemInfo"
import AddButton from "../components/reuseable/AddButton"

const SystemInfo = () => {
    const [isCreateModalVisible, setisCreateModalVisible] = useState(false)
    const systemData = [
        {
            name: "Official Phone Number",
            content: ""
        },
        {
            name: "Official Email",
            content: ""
        },
        {
            name: "School's Slogan",
            content: ""
        },
    ]
    return (
        <div className=" dashboardPages ">
            <AddSystemInfo isModalVisible={isCreateModalVisible} setisModalVisible={setisCreateModalVisible} />
            <h1 className=" text25 " >
                SYSTEM INFORMATION
            </h1>
            <div className=" dashboardHoverSection ">
                <AddButton text="ADD SYSTEM INFORMATION" setState={setisCreateModalVisible} />
                <ul className=" flex flex-col gap-2 ">
                    {
                        systemData.map((obj, idx) => {
                            return(
                                <li className=" flex gap-3 items-center ">
                                    <p className=" text-16 font-bold ">
                                        {obj?.name} :
                                    </p>
                                    <p className=" text-center italic text  p-2 ">
                                        {obj?.content ? obj?.content : `Please add the ${obj?.name}`}
                                    </p>
                                </li>
                            )
                        })
                    }
                    {/* <button 
                        onClick={() => setisCreateModalVisible(true)}
                        className=" p-2 w-fit rounded-lg ring-1 ring-accent"
                    >
                        <FontAwesomeIcon className=" text-[14px]  " icon={faPlus} />
                    </button> */}
                </ul>
            </div>
        </div>
    )
}

export default SystemInfo