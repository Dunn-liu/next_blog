import { useEffect, useState } from 'react'
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
  const isBrowser = (typeof window !== "undefined");
  const router = useRouter();
  const [visible, setVisible] = useState(false);
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
      setVisible(false);
    });
    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
    initRouterListeners()
  }, [router.events]);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const initRouterListeners = () => {
    if (!isBrowser) return
    let latestScrollY = 0 // 跳转前的偏移量
    let latestUrl = window.location.pathname // 跳转前的路由名（默认值为刚打开页面时的路由）
    let route = [] // 跳转的路由集合

    // 路由跳转开始时触发
    Router.events.on('routeChangeStart', () => {
      console.log('latestScrollY',latestScrollY)
      // 此时取到的值是未跳转前页面的偏移量，赋值给 latestScrollY
      latestScrollY = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
      // 向路由集合中加入跳转前的路由名以及页面偏移量
      route.push({ url: latestUrl, scrollY: latestScrollY })
      // 如果路由集合大于两个，删除第一项
      if (route.length > 2) route.shift()
    })

    // 路由跳转结束时触发
    Router.events.on('routeChangeComplete', (url) => {
      // 返回上一页（路由集合不为空且当前路由名等于路由集合第一项的路由名）
      console.log('url',url)
      if (route.length > 0 && url === route[0].url) {
        // 跳转到上次滑动的位置
        window.requestAnimationFrame(() => window.scrollTo(0, route[0].scrollY))
        // 将 latestUrl 赋值为当前路由名
        latestUrl = url
      } else {
        // 跳转至新一页，滑动到开头
        window.requestAnimationFrame(() => window.scrollTo(0, 0))
        // 将 latestUrl 赋值为当前路由名
        latestUrl = url
      }
    })
  }
  return (
<>
    <Head>
        <title>首页 | Dunn的博客</title>
        <meta name="description" content="web前端技术-Dunn的博客" />
        <meta name="keyWords" content="web前端,博客，react，vue，js" />
        <meta name="baidu-site-verification" content="code-IQwuKWKNik" />
        <meta name="google-site-verification" content="wqVlWKO_6FB6BmziDNyZUcx7lt6J6hPtbJXuHUPTe3o" />
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{__html: `var _hmt = _hmt || [];
          (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?9b3e7f4b4238c730965c5c31d8d4c0c4";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
          })();`}} />
      </Head>
      <div className='bg-gray-100'>
        <div className='bg-white w-screen fixed h-16 z-10 shadow-sm'>
          <HeaderV1 visible={visible} showDrawer={showDrawer} onClose={onClose} />
        </div>
        <main className=' h-full p-4 md:px-0 pt-20'>
          <div className='md:mx-auto rounded-xl w-full md:w-3/5'>
            <div className='.shadow-md mx-auto'>
              <Component {...pageProps} />
            </div>
          </div>

          <footer className='flex justify-center items-center md:mx-auto h-12 .shadow-md'>
            <span className='mr-2'>© 2021 Copyright</span><a href="https://beian.miit.gov.cn/#/Integrated/index" target='_blank' rel="noreferrer">粤ICP备2020079967号</a>
          </footer>
          <BackTop>
            <div className='flex h-10 w-10 bg-gray-400 justify-center items-center text-white rounded-lg'>UP</div>
          </BackTop>
        </main>
      </div>
  </>
  )
}

export default MyApp
