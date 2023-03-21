import Navhome from './navhome'

 function Homepage({ Component,  pageProps }) {

    return (
        <>
            <Navhome/>
            <Component {...pageProps} />
        </>
    )
}

export default Homepage
