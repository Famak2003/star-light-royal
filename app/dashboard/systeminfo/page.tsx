"use client"

import { useEffect, useState } from "react"
import AddSystemInfo from "../components/reuseable/AddSystemInfo"
import AddButton from "../components/reuseable/AddButton"
import { systemInfoType, useGetSystemInfoQuery } from "@/lib/api/systemApiSlice"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"

const SystemInfo = () => {
    const {systemInfo} = useSelector((state : RootState) => state.system)
    const [isCreateModalVisible, setisCreateModalVisible] = useState(false)
    const {data, refetch} = useGetSystemInfoQuery()
    const [systemData, setSystemData] = useState([
        {
            title: "phone",
            name: "Official Phone Number",
            content: ""
        },
        {
            title: "email",
            name: "Official Email",
            content: ""
        },
        {
            title: "slogan",
            name: "School's Slogan",
            content: ""
        },
    ])

    // useEffect(() => {
    //     setSystemData(() => {
    //         return {
                
    //         }
    //     })
    // }, [systemInfo])

    useEffect(() => {
        refetch()
    }, [])
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
                            const title = obj.title
                            const content = systemInfo[title as keyof systemInfoType]
                            return(
                                <li className=" flex gap-3 items-center ">
                                    <p className=" text-16 font-bold ">
                                        {obj?.name} :
                                    </p>
                                    <p className=" text-center italic text  p-2 ">
                                        {content ? content : `Please add the ${obj?.name}`}
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