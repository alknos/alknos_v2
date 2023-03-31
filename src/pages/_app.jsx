import '@/styles/globals.css'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  if (router.pathname === '/molViewer') {
    return (
      <iframe src="/molViewer.html" />
    )
  }
  return <Component {...pageProps} />
}
