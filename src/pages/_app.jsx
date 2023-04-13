import '@/styles/globals.css'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const divStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width:'100%' ,
    height: '100%',
    border: 'none'
  }

  if (router.pathname === '/molViewer') {
    return (
      <div  className='bg-white w-full'>
        <iframe style={divStyle} src="/molViewer.html" />
      </div>
    )
  }
  return <Component {...pageProps} />
}
