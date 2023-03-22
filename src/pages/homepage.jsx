import Navbar from "./navbar"

function Homepage({ Component, pageProps }) {

    return <>
        <Navbar />
        <Component {...pageProps} />
    </>

}

export default Homepage