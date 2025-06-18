// import I18N from "@/i18n"

interface AddButtonType {
    text: string;
    setState: (value: boolean) => void;
}

const AddButton: React.FC<AddButtonType> = ({ text, setState}) => {
    return (
        <button
            onClick={() => {
                return setState(true)
            }}
            className=' group flex gap-4 justify-center items-center rounded-md px-4 py-2 bg-primary_black dark:bg-slate-600 w-fit text-white '>
            <span className=" duration-200 transition-all relative group-hover:pr-[30px] group-hover:after:opacity-100 group-hover:after:right-0 after:opacity-0 after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[-30px] after:content-['\FF0B'] after:ml-3 after:text-[25px] after:duration-300 after:transition-all ">
                {text}
            </span>
            
        </button>
    )
}

export default AddButton