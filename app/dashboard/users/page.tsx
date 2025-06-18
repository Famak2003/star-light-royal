"use client"

import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Switch, Table, TableColumnsType } from "antd"
import AddButton from "../components/reuseable/AddButton"
import { useState } from "react"
import AddUser from "../components/AddUser"

const Users = () => {
    const [isCreateModalVisible, setisCreateModalVisible] = useState(false)

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
            title: "Last Login",
            width: "45%",
            dataIndex: "lastlogin",            
            render: (content, record) => {
                return (
                    <div>
                        {record.lastlogin}
                    </div>
                )
            }
        },
        {
            title: "Action",       
            width: "10%",
            render: (content, record) => {
                return (
                    <div>
                        <FontAwesomeIcon className="dashboarIcon" icon={faPen} />
                        <FontAwesomeIcon className="dashboarIcon" icon={faTrashAlt} />
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
                <AddButton text="ADD USER" setState={setisCreateModalVisible} />
                <Table
                    columns={columns}
                    // dataSource={}
                />
            </div>
        </div>
    )
}

export default Users