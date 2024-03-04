import Navbar from "@/components/layout/Navbar";

const PageLayout = ({ children }: { children: React.ReactNode}) => {
    return ( 
        <>
            <Navbar/>
            <div className="min-h-screen bg-gray-100">
                {children}
            </div>
        </>
     );
}
 
export default PageLayout;