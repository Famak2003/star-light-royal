// import I18N from "@/i18n"
import Image from "next/image"
import { useTranslation } from "react-i18next"

type OverViewData = {
    data: {
        image?: string, 
        title?: string, 
        name?: string, 
        writeup?: string
    }[],
    title: string
}

const OverView = ({data, title}: OverViewData) => {
    const { t } = useTranslation()
    return(
        <div className=" w-full h-fit rounded-md px-5 pt-4 pb-7 bg-white shadow-custom_shad5 dark:shadow-custom_shad6 ">
            <h1 className=" text-[17px] sm:text-[20px] font-semibold p-4 border-b-[2px] border-red-700 ">{t("title")}</h1>
            <ul className=" flex flex-col " >
                {
                    data.map((obj, idx) => {
                        const isLast = (data.length - 1) === idx
                        return (
                            <li key={idx} className={`flex justify-between items-center py-5 pr-2 gap-3 ${ isLast ? "" : "border-b" } `}>
                                <figure className={` h-[40px] w-[40px] min-h-[40px] min-w-[40px] overflow-hidden rounded-full `}>
                                    <Image
                                        className=" w-full h-full object-cover "
                                        height={40}
                                        width={40}
                                        src={obj?.image ? obj.image :"/static/svg/net-logo.svg"}
                                        alt="projects"
                                    />
                                </figure>
                                <div className=" flex flex-col mobile:flex-row justify-between gap-3 items-start mobile:items-center max-w-[90%] flex-1 text16 font-semibold ">
                                    {
                                        obj.writeup ? (
                                            <div className=" w-full line-clamp-2 ">
                                                {obj.writeup}
                                            </div>
                                        ): (
                                            <>
                                                <h2 className=" w-[100%] mobile:w-[50%] truncate " >{obj.title}</h2>
                                                <h2 className=" w-[100%] mobile:w-[40%] truncate " >{obj.name}</h2>
                                            </>
                                        )
                                    }
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default OverView