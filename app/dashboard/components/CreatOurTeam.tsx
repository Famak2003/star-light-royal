import { modalStateType } from "@/types"
import CustomModal from "./reuseable/CustomModal"
import { ConfigProvider, Form, Input, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import ImageUpload from "./reuseable/ImageUpload"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const CreateOurTeam: React.FC<modalStateType> = ({isModalVisible, setisModalVisible}) => {
    const [memberImage, setMemberImage] = useState([])
    const [memberData, setMemberData] = useState({
        name: "",
        surname: "",
        title: "",
        writeup: "",
        social: { 
            instagram: "",
            linkedin: "",
            facebook: "",
            twitter: "" 
        }
    })
    const handleSubmit = async () => {
        console.log(memberData)
    }

    const socialsOption = [
        {
            name: "instagram",
            image: "/Assets/insta.png"
        },
        {
            name: "facebook",
            image: "/Assets/facebook3d.png"
        },
        {
            name: "twitter",
            value: "/Assets/twitter3d.png"
        },
        {
            name: "linkedin",
            image: "/Assets/linkedin3d.png"
        }
    ]

    const socialMapData = [
        ...Object.keys(memberData?.social)
    ]

     return(
        <div>
            <CustomModal handleSubmit={handleSubmit} isModalVisible={isModalVisible} setisModalVisible={setisModalVisible} title="Add Team Member" width={"small"} loading={false} >            
                <div>
                    <Form
                        layout="vertical"
                        className=" w-full h-full "
                    >
                        <Form.Item
                            className=""
                            required
                            label={"Name"}
                            name={"name"}
                        >
                            <Input 
                                onChange={(e) => {
                                    setMemberData((prev: any) => {
                                        return {
                                            ...prev,
                                            name: e.target.value
                                        }
                                    })
                                } } 
                                defaultValue={memberData?.name}
                                placeholder="Enter name" />
                        </Form.Item>
                        <Form.Item
                            className=""
                            required
                            label={"Surname"}
                            name={"surname"} 
                        >
                            <Input 
                                onChange={(e) => {
                                    setMemberData((prev: any) => {
                                        return {
                                            ...prev,
                                            surname: e.target.value
                                        }
                                    })
                                } }
                                defaultValue={memberData?.surname}
                                placeholder="Enter surname" 
                            />
                        </Form.Item>
                        <Form.Item
                            className=""
                            required
                            label={"Title"}
                            name={"title"}
                        >
                            <Input 
                                onChange={(e) => {
                                    setMemberData((prev: any) => {
                                        return {
                                            ...prev,
                                            title: e.target.value
                                        }
                                    })
                                } } 
                                defaultValue={memberData?.title}
                                placeholder="Enter title" 
                            />
                        </Form.Item>
                        <Form.Item
                            className=""
                            required
                            label={"Writeup"}
                            name={"writeup"}
                        >   
                            <TextArea 
                                onChange={(e) => {
                                    setMemberData((prev: any) => {
                                        return {
                                            ...prev,
                                            writeup: e.target.value
                                        }
                                    })
                                } } 
                                defaultValue={memberData?.writeup}
                                placeholder="Enter comments/writeup" 
                            />
                        </Form.Item>
                        <Form.Item
                            required
                            label={"Social"}
                            name={"social"}
                        >
                            <ul>
                                {
                                    socialsOption?.map((item, idx) => {
                                        return (
                                            <li
                                                key={idx}
                                                className=" flex gap-2 justify-between items-center w-full "
                                            >
                                                {/* <FontAwesomeIcon                                     
                                                    className=" text rounded-lg ring-hightlight ring-1 bg-accent bg-opacity-10 hover:bg-opacity-30 p-2 duration-500 transition-all " 
                                                    icon={faPlus}
                                                /> */}
                                                <figure className=" w-[40px] aspect-square " >
                                                    <img className=" w-full h-full object-cover " src={item?.image} alt={` ${item?.name} `} />
                                                </figure>
                                                <Input 
                                                    onChange={(e) => {
                                                        setMemberData((prev: any) => {
                                                            return {
                                                                ...prev,
                                                                social: {
                                                                    ...prev.social,
                                                                    [item.name]: e.target.value
                                                                }
                                                            }
                                                        })
                                                    } } 
                                                    defaultValue={item?.name}
                                                    className=" w-[90%] " 
                                                    placeholder={`Enter member's ${item?.name}`} 
                                                />
                                            </li>          
                                        )
                                    })
                                }
                            </ul>     
                            {/* <Select 
                                className=""
                                onChange={(value) => {
                                    console.log(value)
                                    setMemberData((prev: any) => {
                                        return {
                                            ...prev,
                                            social: value                                            
                                        }
                                    })
                                } } 
                                mode="multiple" 
                                placeholder="Enter social media links"
                                options={socialsOption}
                            /> */}
                        </Form.Item>
                        {/* <Form.Item 
                            required
                            name={"images"}
                            label={"Images"}
                        >
                            <ImageUpload 
                                setData={setMemberImage}
                                fileList={memberImage}
                                multiple={false}
                                removeImageApi={removeEventsImage}
                                postImageApi={postEventsImage}
                            />
                        </Form.Item> */}
                    </Form>
                </div>
            </CustomModal>
        </div>
    )
}

export default CreateOurTeam