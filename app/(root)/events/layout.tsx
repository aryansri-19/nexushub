import Navbar from "@/components/layout/Navbar";

const EventLayout = ({ children }: { children: React.ReactNode}) => {
    return ( 
        <>
            <Navbar/>
            <div className="min-h-screen bg-gray-100">
                {children}
            </div>
        </>
     );
}
 
export default EventLayout;