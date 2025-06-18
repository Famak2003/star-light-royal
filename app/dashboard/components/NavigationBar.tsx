"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import Logo from "./svg/logo"
import { Dropdown } from "antd"
import { useSelector } from "react-redux"
import { setisSidebarCollapsed } from "@/lib/slices/dashboardSlice"
import { RootState, useAppDispatch } from "@/lib/store"
// import { Link } from "@/i18n/routing"
import NavButtonCluster from "./reuseable/NavButtonCluster"
import SlimLogo from "./svg/slimLogo"
import Link from "next/link"
import Image from "next/image"

// dropdownRender={(menu) => (
//     <div className="ring-2 bg-white rounded-lg">
//       {React.cloneElement(
//         menu as React.ReactElement<{
//           style: React.CSSProperties;
//         }>
//       )}
//       <hr className=" border-red-600 !w-1/2 " style={{ margin: 0 }} />
//       <Space style={{ padding: 8 }}>
//         <Button type="primary">Click me!</Button>
//       </Space>
//     </div>
// )}
// For mixing the already existing menu with a custome style

const StarLogo = "/Assets/logo.jpeg"


const NavigationBar = () => {
    const dispatch = useAppDispatch()
    const {isSidebarCollapsed, isSidebarHidden} = useSelector((state: RootState) => state.dashboard)

    const handleCollapse = () => {
        dispatch(setisSidebarCollapsed(!isSidebarCollapsed))
    }

    return(
        <nav className=" flex justify-between items-center gap-2 mobile:gap-4 relative h-[74px] py-3 px-4 bg-white dark:bg-navDark border-b dark:border-slate-600 z-[999] " >
            <div className=" flex mobile:gap-2 sm:gap-6 tab:gap-11 items-center w-[490px] tab:w-[539px] h-[50px]  ">
                <div className=" flex justify-between items-center pr-1 sm:min-w-[215px]  " >
                    <Link className=" flex gap-1 justify-between items-center w-[80%] " href={"/dashboard"} >
                        <figure className=" h-[60px] aspect-square " >
                            <Image className=" object-cover w-full h-full " width={50} height={50} src={StarLogo} alt="logo" />                        
                        </figure>
                        <h1 className=" font-[1000] text-center text-headerColor dark:text-white text-[16px] w-full max-w-[80px] ">
                            Star Light Royal
                        </h1>
                        {/* <Logo className=" hidden lmobile:block text-black dark:text-white" width={130} height={50} /> */}
                    </Link>
                    {/* <Link href={"/dashboard"} >
                        <SlimLogo className=" lmobile:hidden " width={50} height={70} />
                    </Link> */}
                    
                    <button 
                        className=" hidden lmd:block text-primary_black dark:text-slate-300 h-[19px] w-[19px] tab:h-[24px] tab:w-[24px] hover:!text-hightlight duration-300 "
                        onClick={handleCollapse}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="" height="" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`lucide lucide-arrow-left-to-line w-6 duration-300 ${isSidebarCollapsed ? " rotate-180 " : " rotate-0 "} `}>
                            <path d="M3 19V5"></path><path d="m13 6-6 6 6 6"></path>
                            <path d="M7 12h14"></path>
                        </svg>
                    </button>
                </div>
                {/* <div className=" flex gap-2 justify- items-center px-[10px] h-[36px] tab:h-[44px] rounded-lg w-[150px] mobile:w-[200px] sm:flex-1 ring-[1px] ring-gray-300 focus: bg-gray-50 dark:bg-gray-500 dark:ring-gray-500 " >
                    <FontAwesomeIcon className=" text-black dark:text-white" icon={faSearch}/>
                    <input className=" input bg-transparent h-full ring-0 border-none focus-within::border-none " type="search" placeholder="Ürün Ara" />
                </div> */}
            </div>
            <div className=" flex flex-row justify-end md:justify-center items-center gap-2 lmd:gap-5 w-fit md:w-[200px] lmd:w-[290px] " >
                <Dropdown
                    dropdownRender={() => {
                        return(
                            <div className=" w-[200px] ">
                                <NavButtonCluster/>
                            </div>
                        )
                    }}
                >
                    <div className=" order-2 md:hidden w-[40px] h-[40px] flex justify-center items-center bg-navDark text-deep_red rounded-md " >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </Dropdown>
                <div className=" hidden md:block flex-1">
                    <NavButtonCluster/>
                </div>
                <Dropdown
                    // className=" absolute right-[10px] lmd:right-0 top-[-15px] lmd:top-0 translate-y-[50%] lmd:translate-y-0 lmd:relative "
                    trigger={['click']} 
                    placement="bottomLeft"
                    dropdownRender={() => (
                        <div className="flex flex-col items-center justify-center gap-2 p-4 mt-2 bg-white rounded-lg" >
                            <h1 className="text-start w-full" >
                                Lorem Ipsum
                            </h1>
                            <hr className=" w-full " />
                            <ul className=" flex flex-col gap-2 pb-2 text-sm w-[150px] h-16" >
                                <li>
                                    Profile
                                </li>
                                <li>
                                    Çıkış Yap
                                </li>
                            </ul>
                        </div>
                    )}
                >
                    <div className=" order-1 md:order-2 cursor-pointer flex justify-center items-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full ring-2 ring-red-600 " >
                        <Logo className=" text-black dark:text-white" width={40} height={30}/>
                    </div>
                </Dropdown>
            </div>
        </nav>
    )
}
export default NavigationBar