import GlobalNav from "@/components/dashboard/GlobalNav";




export default async function RootLayout({ children }) {


    return (
        <>
            <GlobalNav />
            <div className="md:w-[80vw] relative m-auto ">
                {children}
            </div>
        </>
    );
}
