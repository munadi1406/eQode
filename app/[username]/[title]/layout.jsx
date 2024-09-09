import GlobalNav from "@/components/dashboard/GlobalNav";




export default async function RootLayout({ children }) {


    return (
        <>
            <GlobalNav />

            {children}

        </>
    );
}
