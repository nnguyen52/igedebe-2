import 'bootstrap/dist/css/bootstrap.min.css';
import { SWRConfig } from 'swr';
import Footer from '../component/Footer';
import Header from '../component/Header';
import '../styles/globals.css';
import { SSRProvider } from 'react-bootstrap';
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      <SSRProvider>
        <SWRConfig
          value={{ dedupingInterval: 2000, fetcher: (url) => axios(url).then((res) => res.data) }}
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SWRConfig>
      </SSRProvider>
    </>
  );
}

export default MyApp;
