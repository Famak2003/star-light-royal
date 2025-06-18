"use client"

// import I18N from "@/i18n";
import { useGetInfoQuery } from "@/lib/api/dashboardApiSlice";
import { faBullhorn, faCake, faNewspaper, faPen, faPlus, faProjectDiagram, faTrashAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JSX, useEffect, useState } from "react";
import useTranslation from "@/lib/useTranslation"
import { Switch, Table, TableColumnsType } from "antd";
import AddButton from "./components/reuseable/AddButton";
import AddSection from "./components/AddSection";
import AddCarousel from "./components/reuseable/AddCarousel";
import CarouselDefaultCard from "./components/reuseable/CarouselDefaultCard";
// import { useTranslation } from "react-i18next";
// import { Link } from "@/i18n/routing";


interface statType {
    title: string,
    link: string,
    amount: number,
    icon: JSX.Element
}

type statsType = statType[]

export default function Dashboard() {
    const { t } = useTranslation()
    const {data, error, isLoading, refetch} = useGetInfoQuery()
    const [isCreateModalVisible, setisCreateModalVisible] = useState(false)
    const [isCreateCarouselModalVisible, setisCreateCarouselModalVisible] = useState(false)

    const columns: TableColumnsType = [
       {
            title: "Title",
            width: "15%",
            dataIndex: "title",
            defaultSortOrder: "ascend",
            render: (title, record) => {
                return (
                    <p>
                        {record.title}
                    </p>
                )
            }
        },
        {
            title: "Content",
            width: "45%",
            dataIndex: "content",            
            render: (content, record) => {
                return (
                    <div dangerouslySetInnerHTML={content} >
                    </div>
                )
            }
        },
        {
            title: "Status",
            width: "20%",
            dataIndex: "status",            
            render: (status, record) => {
                return (
                    <div >
                        <Switch checkedChildren={"active"} unCheckedChildren={"hidden"} defaultValue={status} />
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

    useEffect(() => {
        refetch()
    }, [])

    return (
        <div className=" dashboardPages ">
            <div className=" dashboardPages ">
                <h1 className=" text25 " >
                    CAROUSEL
                </h1>
                <div className=" dashboardHoverSection ">
                    <AddButton text="ADD CAROUSEL" setState={setisCreateCarouselModalVisible} />
                    <AddCarousel isModalVisible={isCreateCarouselModalVisible} setisModalVisible={setisCreateCarouselModalVisible} />                    
                    <ul className=" flex gap-4 overflow-x-scroll DisableScrollBar ">
                        {
                            Array.from({length:5}).map((_, idx) => {
                                return (                                    
                                    <CarouselDefaultCard setState={setisCreateCarouselModalVisible} idx={idx} />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className=" dashboardPages ">
                <h1 className=" text25 " >
                    SECTIONS
                </h1>
                <div className=" dashboardHoverSection ">
                    <AddButton text="ADD SECTION" setState={setisCreateModalVisible} />
                    <AddSection isModalVisible={isCreateModalVisible} setisModalVisible={setisCreateModalVisible}/>
                    <Table
                        columns={columns}
                        // dataSource={}
                    />
                </div>
            </div>

        </div>
    );
}
