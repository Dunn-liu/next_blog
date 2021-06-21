import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home({classify}) {
    console.log('json',classify)
    const {data} = classify
  return (
    <div>
        {
            data.map(item => {
                return (
                    <Link href={`/article?id=${item.id}`} key={item.id}>
                        <a>{item.classifyName}</a>
                    </Link>
                )
            })
        }
        {/*<Link href='/article'>*/}
        {/*    <a>分类</a>*/}
        {/*</Link>*/}
    </div>
  )
}
Home.getInitialProps = async (ctx) => {
    const classifyRes = await fetch('https://api.codespring.top/articleClassify')
    const classify = await classifyRes.json()
    return {classify}
}
