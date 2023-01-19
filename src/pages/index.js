import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import {Pagination, Row, Avatar, Tag, Spin, Affix} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { apiGet } from "../utils/api";
import ListItem from './../components/ListItem/index';
export default function Home({ classifyRes, listRes, userRes, page }) {
    const [listData, setListData] = useState([])
    const [classifyData, setClassifyData] = useState([])
    const [userData, setUserData] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const route = useRouter()
    const tagColorArr = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
    const IconFont = createFromIconfontCN({
        scriptUrl: [
            '//at.alicdn.com/t/font_2506739_97d4vy8pv1h.js',
        ],
    });
    useEffect(() => {
        setListData(listRes?.data??[])
        setClassifyData(classifyRes?.data??[])
        setUserData(userRes?.info??{})
    }, [classifyRes?.data, listRes?.data, userRes?.info])
    const pageChange =  (page) => {
        route.push({
            pathname: '/',
            query: {
                page
            }
        })
    }
    useEffect(()=>{
        setCurrentPage(page)
    },[page])
    return (
        <div className='flex'>
            <div className='w-auto md:w-11/12 bg-white bg-opacity-75 md:mr-6 px-8 py-6 rounded-md shadow-md'>
                {listData.length ?
                    <div>
                        {
                            listData?.map(item => {
                                return <ListItem classifyData={classifyData} key={item.id} data={item} />
                            })
                        }
                            <Pagination key={currentPage} defaultCurrent={currentPage} total={listRes?.pageNation?.total} hideOnSinglePage onChange={pageChange} />
                    </div> : <div className='flex justify-center items-center h-full w-full'>
                        <Spin />
                    </div>
                }

            </div>
              <Affix offsetTop={80}>
              <div className='md:block hidden bg-white bg-opacity-75 px-8 py-6 flex-1 rounded-md shadow-md'>
                <div>
                    <Row className='flex justify-center'>
                        <Avatar src={userData.avatar} size={70} />
                    </Row>
                    <Row className='mb-6 flex justify-center text-lg font-bold'>
                        {userData.user_nickname}
                    </Row>
                    <Row className='mb-6 flex text-base items-center flex-nowrap overflow-ellipsis'>
                        <IconFont type='icon-Emailus' />&nbsp;&nbsp;
                        <a href={'mailto:' + userData.email}>Email</a>
                    </Row>
                    <Row className='mb-6 flex text-base items-center'>
                        <IconFont type='icon-QQ' />&nbsp;&nbsp;
                        <a target="_blank" rel="noreferrer"
                            href="http://wpa.qq.com/msgrd?v=3&uin=1150066420&site=qq&menu=yes">QQ</a>
                    </Row>
                    <Row className='mb-6 flex text-base items-center'>
                        <IconFont type='icon-yinle' />
                        &nbsp;&nbsp;
                        <a href='https://music.163.com/#/playlist?id=321703385' target='_blank'
                            rel="noreferrer">网易云音乐</a>
                    </Row>
                    <Row className='mb-6 flex text-base items-center'>
                        <IconFont type='icon-github' />&nbsp;&nbsp;
                        <a href='https://github.com/Dunn-liu' target='_blank' rel="noreferrer">GitHub</a>
                    </Row>
                </div>
                <div>
                    <Row className='text-lg mb-6'>分类标签</Row>
                    <div className="flex flex-wrap">
                        {
                            classifyData && classifyData.map(item => {
                                return (
                                    <Tag key={item.id} className='cursor-pointer mb-3' onClick={() => route.push({
                                        pathname: '/searchResult',
                                        query: {
                                            classifyId: item.id
                                        }
                                    })} color={tagColorArr[Math.floor(Math.random() * (tagColorArr.length))]}>{item.classifyName}</Tag>
                                )
                            })
                        }
                    </div>
                </div>
              </div>
            </Affix>
        </div>
    )
}
Home.getInitialProps = async (ctx) => {
    const {query:{page=1}} = ctx
    const classifyRes = await apiGet('/articleClassify')
    const listRes = await apiGet('/blog/queryArticle', { page })
    const userRes = await apiGet('/blog/info')
    return { classifyRes, listRes, userRes, page }
}
