"use client"

import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MenuProps, Switch, Table, TableColumnsType, Tooltip } from "antd"
import AddButton from "../components/reuseable/AddButton"
import { useEffect, useState } from "react"
import AddUser from "../components/AddUser"
import { addUserType, useGetUsersQuery } from "@/lib/api/userApiSlice"
import { user } from "@/lib/slices/userSlice"

const Users = () => {
    const {refetch, data} = useGetUsersQuery()
    const [isCreateModalVisible, setisCreateModalVisible] = useState(false)
    const [isEditModalVisible, setisEditModalVisible] = useState(false)
    const [isDeleteId, setIsDeleteId] = useState(null)
    const [individualData, setIndividualData] = useState<user>({
        id: null,
        name: "",
        email: ''
    })

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
            <div className={` flex flex-col justify-center items-center w-[120px] gap-3 p-3 rounded-2xl ring-1 bg-white ring-hightlight`}>
                <span>Are you sure?</span>
                <div className=" flex justify-between h-fit w-full  ">
                    <button className=" text p-2 rounded-lg transition-all duration-300 bg-red-500 " >No</button>
                    <button className=" text p-2 rounded-lg transition-all duration-300 bg-green-500 " >Yes</button>
                </div>
            </div>
            ),
        },
        // {
        //     key: '2',
        //     label: (
        //     <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        //         2nd menu item (disabled)
        //     </a>
        //     ),
        //     icon: <SmileOutlined />,
        //     disabled: true,
        // },
    ]

    console.log(data)

    useEffect(() => {
        refetch()
    }, [])

    const columns: TableColumnsType = [
        {
            title: "Name",
            width: "15%",
            dataIndex: "name",
            render: (title, record) => {
                return (
                    <p>
                        {record.name}
                    </p>
                )
            }
        },
        {
            title: "Email",
            width: "15%",
            dataIndex: "email",
            render: (title, record) => {
                return (
                    <p>
                        {record.email}
                    </p>
                )
            }
        },        
        {
            title: "Action",       
            width: "10%",
            render: (value, record) => {
                const userRecord = record as user;
                return (
                    <div className=" relative flex gap-2 item-center justify-start ">
                        <Tooltip title={"Edit"}>
                            <FontAwesomeIcon
                                className="dashboarIcon" icon={faPen} 
                                onClick={()=> {                                
                                    setisEditModalVisible(!isEditModalVisible)
                                    setIndividualData(userRecord)
                                }}
                            />
                        </Tooltip>
                        <Tooltip  title={"Delete"} >
                            <FontAwesomeIcon 
                                className="dashboarIcon" icon={faTrashAlt} 
                                onClick={() => {
                                    return setIsDeleteId(record?.id)
                                }}
                            />
                        </Tooltip>
                        <div className={` z-[999] absolute ${isDeleteId === record?.id ? "flex" : "hidden" } top-0 right-0  flex-col justify-center items-center w-[120px] gap-3 p-3 rounded-2xl ring-1 bg-white ring-gray-500`}>
                            <span>Are you sure?</span>
                            <div className=" flex justify-between text-white h-fit w-full  ">
                                <button className=" text p-2 rounded-lg transition-all duration-300 bg-red-500 " >No</button>
                                <button className=" text p-2 rounded-lg transition-all duration-300 bg-green-500 " >Yes</button>
                            </div>
                        </div>
                    </div>
                )
            }
        },
    ]

    return(
        <div>
            <h1 className=" text30 " >
                USERS
            </h1>
            <div className=" dashboardHoverSection ">
                <AddUser isModalVisible={isCreateModalVisible} setisModalVisible={setisCreateModalVisible} />
                <AddUser isModalVisible={isEditModalVisible} setisModalVisible={setisEditModalVisible} data={individualData} />
                <AddButton text="ADD USER" setState={setisCreateModalVisible} />
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </div>
    )
}

export default Users