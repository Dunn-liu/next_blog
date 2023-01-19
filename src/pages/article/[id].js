import { withRouter } from 'next/router'
import Head from "next/head";
import { useEffect, useState, useRef } from 'react'
import { Spin } from 'antd'
import { VMdParser } from '@kangc/v-md-editor/lib/utils/v-md-parser'
import githubThemeParser from '@kangc/v-md-editor/lib/theme/github-parser'
import vueThemeParser from '@kangc/v-md-editor/lib/theme/vuepress-parser'
import { apiGet } from "../../utils/api";
import smoothScroll from '../../utils/smooth-scroll';
import { getScrollTop } from '../../utils/scroll-top';
import moment from 'moment'
import styles from './index.module.scss'
import {throttle} from 'lodash'
const Article = ({ router, res }) => {
    const parser = new VMdParser()
    const [html, setHtml] = useState('')
    const [titles, setTitles] = useState([])
    const [catalogIndex, setCatalogIndex] = useState(null)
    const [scroll,setScroll] = useState(0)
    const tagRef = useRef(null)
    parser.use(githubThemeParser).use(vueThemeParser, {
        codeHighlightExtensionMap: {
            vue: 'xml',
            react: 'xml'
        },
    })
    const newHtml = parser.parse(res?.data?.[0]?.article_content)
    useEffect(() => {
        setHtml(newHtml)
    }, [newHtml])
    useEffect(()=>{
        const anchors = tagRef.current.querySelectorAll('h1,h2,h3,h4,h5,h6');
        const newTitles = Array.from(anchors).filter((title) => !!title.innerText.trim());
        if (!newTitles.length) {
            setTitles([])
            return;
        }

        const hTags = Array.from(new Set(newTitles.map(item => item.tagName))).sort();

        setTitles(newTitles.map((el) => ({
            title: el.innerText,
            lineIndex: el.getAttribute('data-v-md-line'),
            indent: hTags.indexOf(el.tagName),
        })))
        console.log('titles',newTitles.map((el) => ({
            title: el.innerText,
            lineIndex: el.getAttribute('data-v-md-line'),
            indent: hTags.indexOf(el.tagName),
        })))
    },[tagRef.current])
    useEffect(()=>{
        window.addEventListener('scroll',throttle(scrollHandler,100))
        return ()=>{
            window.removeEventListener('scroll',throttle(scrollHandler,100))
        }
    },[])
    useEffect(()=>{
        const anchors = tagRef.current.querySelectorAll('h1,h2,h3,h4,h5,h6');
        const newTitles = Array.from(anchors).filter((title) => !!title.innerText.trim());
        for (let i = newTitles.length-1;i>=0;i--) {
            if (scroll >= newTitles[i].offsetTop - 120) {
                setCatalogIndex(i)
                break;
            }
        }
    },[scroll])
    const scrollHandler = () => {
        setScroll(document.documentElement.scrollTop || document.body.scrollTop)
    }
    const handleAnchorClick = (anchor,index) => {
        const { lineIndex } = anchor;

        const heading = tagRef.current.querySelector(`[data-v-md-line="${lineIndex}"]`);

        if (heading) {
            scrollToTarget({
                target: heading,
                scrollContainer: window,
                top: 90,
            });
        }
    }
    const getOffsetTop = (target, container) => {
        const rect = target.getBoundingClientRect();

        if (container === window || container === document.documentElement) {
            return rect.top;
        }

        return rect.top - container.getBoundingClientRect().top;
    }
    const scrollToTarget = ({ target, scrollContainer = window, top = 0, onScrollEnd }) => {
        const offsetTop = getOffsetTop(target, scrollContainer);
        const scrollTop = getScrollTop(scrollContainer) + offsetTop - top;

        smoothScroll({
            scrollTarget: scrollContainer,
            scrollToTop: scrollTop,
            onScrollEnd,
        });
        // style={`padding: 10px 0 10px ${item.indent * 20}px`}
    }
    return (
        <div>
            <Head>
                <title>{res?.data?.[0]?.article_title}</title>
                <meta name="description" content={res?.data?.[0]?.article_title}></meta>
            </Head>
            {res.data ?
                <div className='bg-white bg-opacity-75 shadow-md'>
                    <div className="px-4 pt-4">
                        <div className="text-2xl font-bold text-center text-gray-700">
                            {res?.data?.[0]?.article_title}
                        </div>
                        <div className="flex flex-col items-center">
                            <span className='text-base text-gray-500'>作者: {res?.data?.[0]?.author_nickname}</span>
                            <span className='text-base text-gray-500'>发布时间: {moment(res?.data?.[0]?.post_date).format('YYYY-MM-DD HH:mm:ss')}</span>
                        </div>
                    </div>
                    <div style={{display:`${titles.length?'block':'none'}`}}>
                        <div className={`md:block hidden w-72 max-w-xs flex flex-col fixed top-20 shadow-md  ${styles.articleCatalog}`} >
                            <div className={styles.catalogTitle} >目录</div>
                            <div className={styles.catalogBody}>
                                <ul className={styles.catalogList} >
                                    {
                                        titles.map((item,index) =>
                                            <li className={styles.item} key={index}  onClick={()=>handleAnchorClick(item,index)}>
                                                <div className={`${styles.aContainer} ${index===catalogIndex?styles.active:''}`} style={{marginLeft:`${item.indent * 20}px`}}>
                                                    <a className={styles.catalogATag}>{ item.title }</a>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="v-md-editor-preview github-markdown-body vuepress-markdown-body copy-code-mode" ref={tagRef} dangerouslySetInnerHTML={{ __html: html }}></div>
                </div> : <Spin />
            }
        </div>

    )
}
export async function getServerSideProps(ctx) {
    // Fetch data from external API
    const { query } = ctx
    if (!query.id.includes('.html')) {
        return {
            redirect: {
                destination: `/article/${query.id}.html`,
                permanent: false,
            }
        }
    }
    const path = query.id.split('.html')[0]
    const res = await apiGet('/blog/getArticle', { id: path })
    return { props: { res } }
}
export default withRouter(Article)
