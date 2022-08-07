import '../styles/globals.css'
import StoreProvider from '../utils/Store'
function MyApp({ Component, pageProps }) {
  return(
    <StoreProvider>
      <div className='font-serif'>
          <Component {...pageProps} />
      </div>

    </StoreProvider>
    )
}



export default MyApp
