const Auth = ({children} : {children: React.ReactNode}) => {
    return(
        <div className="flex justify-center items-center min-h-[100dvh] bg-white ">
            {children}
        </div>
    )

}

export default Auth