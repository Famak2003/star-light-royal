const SidebarIcon = ({children}: {children: React.ReactNode}) => {
    return(
        <span className=" flex justify-center items-center w-10 h-10 bg-white dark:bg-transparent [.parent-class:hover_&]:bg-white " >
            {children}
        </span>
    )
}

export default SidebarIcon