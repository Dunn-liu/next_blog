import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { apiGet } from "../utils/api";
import ListItem from './../components/ListItem/index';

export default function Home({ classifyRes, listRes }) {
    const classifyData = classifyRes?.data
    const listData = listRes?.data
    console.log('sdd', listData);
    return (
        <>
            <div>
                {
                    classifyData && classifyData.map(item => {
                        return (
                            <Link href={`/article/${item.id}`} key={item.id}>
                                <a>{item.classifyName}</a>
                            </Link>
                        )
                    })
                }
            </div>
            <div>
                {
                    listData?.map(item => {
                        return <ListItem key={item.id} data={item} />
                    })
                }

            </div>
        </>
    )
}
Home.getInitialProps = async (ctx) => {
    const classifyRes = await apiGet('https://api.codespring.top/articleClassify')
    const listRes = await apiGet('https://api.codespring.top/blog/queryArticle')
    return { classifyRes, listRes }
}
