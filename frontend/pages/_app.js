import '../styles/globals.css'
import TopNavbar from "../components/TopNavbar"
import HeadBar from '../components/headBar'
function MyApp({ Component, pageProps }) {
  return(
    <>
    <HeadBar/>
    <TopNavbar/>
    <Component {...pageProps} />
    </>
    )
}

export default MyApp
