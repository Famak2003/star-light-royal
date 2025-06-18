import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className=" w-[100vw] " >
            <NavigationBar/>
            <div className=" dashboardBody flex relative " >
                <Sidebar/>
                <div className="  DisableScrollBar flex-1 overflow-y-scroll h-full px-8 pt-5 text-black dark:text-gray-300 bg-gray-200 dark:bg-slate-600 " >
                    {children}
                </div>
            </div>
        </div>
    );
  }
  