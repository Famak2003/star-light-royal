import { ReactNode } from "react"

interface SectionType {
    children: ReactNode
}

const Section: React.FC<SectionType> = ({children}) => {
    return(
        <div className="flex flex-col gap-6 bg-white dark:bg-dark_side rounded-md p-6 duration-300 transition-all shadow-custom_shad5">
            {children}
        </div>
    )
}

export default Section