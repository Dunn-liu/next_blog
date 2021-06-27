import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {apiGet} from "../utils/api";

export default function Home({classifyRes}) {
    console.log('json',classifyRes)
    const {data} = classifyRes
  return (
    <div>
        {
            data && data.map(item => {
                return (
                    <Link href={`/article/${item.id}`} key={item.id}>
                        <a>{item.classifyName}</a>
                    </Link>
                )
            })
        }
    </div>
  )
}
Home.getInitialProps = async (ctx) => {
    const classifyRes = await apiGet('https://api.codespring.top/articleClassify')
    return {classifyRes}
}
