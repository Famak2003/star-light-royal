"use client"

import { Dropdown } from "antd"
import Cart from "../svg/cart"
import ThreeLayer from "../svg/threeLayers"
import Logo from "../svg/logo"
import Bell from "../svg/bell"
import StackLeftVertic from "../svg/stackLeftVertic"
import Navbar from "../svg/navbar"
import { useEffect, useState } from "react"
import Bulb from "../svg/bulb"
import Moon from "../svg/moon"

const NavButtonCluster = () => {
    const [sidebarPos, setSidebarPos] = useState<string>('sidebar')
    const [darkmode, setDarkmode] = useState<boolean | null>(null)

     // // darkmode
    useEffect(() =>{
        if (darkmode === null) return;
        const root = window.document.documentElement
        if (darkmode){
            root.classList.add('dark')
        }else{
            root.classList.remove('dark')
        }
    
        //save dark-mode preference
        localStorage.setItem("dark-mode", `${darkmode}`);
    }, [darkmode])
    useEffect(() => {
        const storedDarkmode = localStorage.getItem('dark-mode') === "true"
        setDarkmode(storedDarkmode)
    }, [])

    const handleChangeSidebarPosition = (pos: string) => {
        setSidebarPos(pos)
    }

    return(
        <div className=" flex justify-between items-center flex-1 p-3 md:p-0 rounded-md md:rounded-none bg-white dark:bg-navDark md:dark:bg-transparent md:bg-transparent shadow-custom_shad5 dark:shadow-custom_shad7 md:dark:shadow-none md:shadow-none ">
            <button 
                type="button"
                onClick={(e) => e.stopPropagation()} className=" relative h-6 w-6 "
            >
                <Cart/>
            </button>
            <Dropdown
                trigger={['click']} 
                placement="bottomLeft"
                dropdownRender={() => (
                    <div className="flex flex-col items-center justify-center gap-2 p-4 mt-2 bg-white rounded-lg" >
                        <h1 className=" text18 text-gray-700" >
                            Araçlar
                        </h1>
                        <ul>
                            <li>

                            </li>
                        </ul>
                    </div>
                )}
            >
                <button className=" text-gray-600 dark:text-slate-100 text-xl " >
                    <ThreeLayer/>
                </button>
            </Dropdown>
            <Dropdown
                trigger={['click']} 
                placement="bottomLeft"
                dropdownRender={() => (
                    <div className="flex flex-col items-center justify-center gap-2 p-4 mt-2 bg-white rounded-lg" >
                        <h1 className=" text18 text-gray-700" >
                            Bildirimler
                        </h1>
                        <ul>
                            <li className=" flex justify-between text-gray-500 w-[300px] h-[87px] px-3 py-4 border-b ">
                                <div className=" cursor-pointer flex justify-center items-center w-[44px] h-[44px] rounded-full ring-2 ring-red-600 " >
                                    <Logo className=" text-black " width={38} height={30}/>
                                </div>
                                <div className=" max-w-[212px] " >
                                    <span className=" text-gray-900 pr-2 ">Rifat Samjjd</span> 
                                    tteyur dolor sit amet consectetur adipisicing elit
                                    <small className=" block text-black">az once</small>
                                </div>
                            </li>
                            <div className=" text-center text16 py-2 " >
                                Tümünü gör
                            </div>
                        </ul>
                    </div>
                )}
            >
                <button className="text-gray-600 dark:text-slate-100 text-xl">
                    <Bell />
                </button>
            </Dropdown>
            <Dropdown
                trigger={['click']} 
                placement="bottom"
                dropdownRender={() => (
                    <div className=" flex flex-col items-center justify-center gap-2 p-4 mt-2 bg-white rounded-lg">
                        <h1>
                            Menu Pozisyonu
                        </h1>
                        <hr className=" w-full " />
                        <ul className=" barPosition " >
                                <li onClick={() => handleChangeSidebarPosition("sidebar")} >
                                    <StackLeftVertic/>
                                    <p>Sidebar</p>
                                </li>
                                <li onClick={() => handleChangeSidebarPosition("navbar")} >
                                    <Navbar/>
                                    <p>Navbar</p>   
                                </li>
                        </ul>
                    </div>
                )}
            >
                <button className={` text-gray-600 dark:text-slate-100 text-xl duration-300 ${sidebarPos === 'sidebar' ? "rotate-0" : "rotate-90 scale-y-[-1]"} `} >
                    <StackLeftVertic/>
                    {/* {
                        sidebarPos === "sidebar" ?
                            <StackLeftVertic/>
                        :
                            <Navbar/>
                    } */}
                </button>
            </Dropdown>
            <button className=" text-gray-600 dark:text-slate-100 hover:!text-hightlight text-xl " 
                onClick={() => { 
                    setDarkmode(!darkmode)
                }}
            >
                { darkmode ? 
                    <Bulb/> :
                    <Moon/>
                }
            </button>
        </div>
    )
}

export default NavButtonCluster