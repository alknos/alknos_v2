import Head from "next/head"
import MainPage from "./homepageComponent/mainPage"
import Navhome from "./navhome"

function Homepage() {
    return (

        <Navhome>
            <Head>
                <title>Homepage | Alknos</title>
            </Head>
            <MainPage />
        </Navhome>

    )
}

export default Homepage
