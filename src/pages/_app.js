import { useEffect } from 'react'
import { useRouter, Router } from 'next/router'
import NProgress from 'nprogress'
import Head from "next/head";
import { BackTop } from 'antd'
import HeaderV1 from "../components/HeaderV1";
import 'antd/dist/antd.css'
import 'nprogress/nprogress.css'
import 'antd/dist/antd.css';
import "tailwindcss/tailwind.css";
// md样式
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    Router.events.on("routeChangeStart", (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${shallow ? 'with' : 'without'
        } shallow routing`
      )
      NProgress.start();
    });
    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
  }, [router.events]);
  return (
    <>
      <Head>
        <title>首页 | Dunn的博客</title>
        <meta name="description" content="web前端技术-Dunn的博客" />
        <meta name="keyWords" content="web前端,博客，react，vue，js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-white w-screen fixed h-16 z-10 shadow-sm'>
        <HeaderV1 />
      </div>
      <main className='bg-gray-100 h-full p-4 md:px-0 mt-16 pt-20'>
        <div className='md:mx-auto bg-white rounded-xl w-full md:w-3/5'>
          <div className='.shadow-md mx-auto'>
            <Component {...pageProps} />
          </div>
        </div>

        <footer className='flex justify-center items-center md:mx-auto h-12 .shadow-md'>
          <span className='mr-2'>© 2021 Copyright</span><a href="https://beian.miit.gov.cn/#/Integrated/index" target='_blank' rel="noreferrer">粤ICP备2020079967号-2</a>
        </footer>
        <BackTop>
          <div className='flex h-10 w-10 bg-gray-400 justify-center items-center text-white rounded-lg'>UP</div>
        </BackTop>
      </main>
    </>
  )
}

export default MyApp
