import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Pagination } from 'antd';
import { apiGet } from "../utils/api";
import ListItem from './../components/ListItem/index';

export default function Home({ classifyRes, listRes }) {
    const [count, setCount] = useState(1)
    const [listData, setListData] = useState(listRes?.data)
    const [classifyData, setClassifyData] = useState(classifyRes?.data)
    console.log('sdd', listData);
    const pageChange = async (page) => {
        const res = await apiGet('/blog/queryArticle', { page })
        setListData(res.data)
    }
    return (
        <>
            {/*<div>*/}
            {/*    {*/}
            {/*        classifyData && classifyData.map(item => {*/}
            {/*            return (*/}
            {/*                <Link href={`/article/${item.id}`} key={item.id}>*/}
            {/*                    <a>{item.classifyName}</a>*/}
            {/*                </Link>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</div>*/}
            {/* rounded-t-xl overflow-hidden bg-gradient-to-r from-indigo-50 to-indigo-100 px-6 py-8 */}
            <div className='flex'>
                <div className='w-auto md:w-3/5  md:mr-6 px-8 py-6'>
                    {
                        listData?.map(item => {
                            return <ListItem classifyData={classifyData} key={item.id} data={item} />
                        })
                    }
                    <Pagination defaultCurrent={1} total={listRes?.pageNation?.total} hideOnSinglePage onChange={pageChange} />
                </div>
                <div className='md:block hidden bg-white'>
                    123
                </div>


            </div>
        </>
    )
}
Home.getInitialProps = async (ctx) => {
    const classifyRes = await apiGet('/articleClassify')
    const listRes = await apiGet('/blog/queryArticle')
    return { classifyRes, listRes }
}
