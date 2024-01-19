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
import styles from './index.module.scss'
import {apiGet} from "../utils/api";
import windmill from '../../public/windmill.svg'
// md样式
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
function MyApp({ Component, pageProps }) {
  const isBrowser = (typeof window !== "undefined");
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [playState,setPlayState] = useState(false)
  const [isMobile,setIsMobile] = useState(false)
  const [bgUrl, setBgUrl] = useState('http://cdn-ali-img-shstaticbz.shanhutech.cn/bizhi/staticwp/202202/129599c797d89bba06d78c8f229eabde--3881082716.jpg')
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
  useEffect(()=>{
    setIsMobile(!!window?.navigator?.userAgent?.match(/(iPhone|iPod|Android|ios)/i))
    window.addEventListener('resize',()=>{
      setIsMobile(!!window?.navigator?.userAgent?.match(/(iPhone|iPod|Android|ios)/i))
    })
    return window.removeEventListener('resize',()=>{
      setIsMobile(!!window?.navigator?.userAgent?.match(/(iPhone|iPod|Android|ios)/i))
    })
  },[])
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
  const changeBg = () => {
      setPlayState(true)
      apiGet('/imgUrl/random').then(res => {
        const src = res.data?.[0]?.url
        src && setBgUrl(src)
        setTimeout(()=>{
          setPlayState(false)
        },500)
      }).catch(e=> {
        setPlayState(false)
      })
  }
  return (
<>
    <Head>
        <title>首页 | 前端博客</title>
        <meta name="description" content="web前端技术-Dunn的博客" />
        <meta name="keyWords" content="web前端,博客，react，vue，js" />
        <meta name="baidu-site-verification" content="code-IQwuKWKNik" />
        <meta name="google-site-verification" content="wqVlWKO_6FB6BmziDNyZUcx7lt6J6hPtbJXuHUPTe3o" />
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{__html: `var _hmt = _hmt || [];
          (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?8b12b7590d782e63ad87d696ecb35fbf";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
          })();`}} />
          <script dangerouslySetInnerHTML={{__html: `var _hmt = _hmt || [];
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "kob1wnefaq");`}} />
      </Head>
      <div className={`bg-gray-100 bg-opacity-75 ${styles.wallpaper}`} style={{backgroundColor:`#f4f5f5`}}>
        <div className='fixed z-10 w-full h-16 bg-white bg-opacity-75 shadow-sm'>
          <HeaderV1 visible={visible} showDrawer={showDrawer} onClose={onClose} />
        </div>
        <main className='min-h-screen p-4 pt-20 overflow-y-scroll md:px-0' style={{minHeight:'100vh'}}>
          <div className='w-full md:mx-auto rounded-xl md:w-3/5'>
            <div className='mx-auto '>
              <Component {...pageProps} />
            </div>
          </div>

          <footer className='flex justify-center items-center md:mx-auto h-12 .shadow-md'>
            <span className='mr-2'>© 2021 Copyright</span><a href="https://beian.miit.gov.cn/#/Integrated/index" target='_blank' rel="noreferrer">粤ICP备2020079967号</a>
          </footer>
          <BackTop>
            <div className='flex items-center justify-center w-10 h-10 text-white bg-gray-400 bg-opacity-75 rounded-lg'>UP</div>
          </BackTop>
        </main>
      </div>
  {!isMobile&&<div className={styles.windWill}>
    <img onClick={changeBg} style={{'animationPlayState': playState ? 'running' : 'paused'}} src={windmill.src}
         alt=""/>
    <span></span>
  </div>}
  </>
  )
}

export default MyApp
