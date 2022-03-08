import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import {Pagination, Row, Avatar, Tag, Spin, message, Button} from 'antd';
import { createFromIconfontCN, ReloadOutlined } from '@ant-design/icons';
import { apiGet } from "../utils/api";
import ListItem from './../components/ListItem/index';
// import InfiniteScroll from 'react-infinite-scroll-component';
// let currentPage = 1
export default function Home({ classifyRes, listRes, userRes, page }) {
    const [listData, setListData] = useState([])
    const [classifyData, setClassifyData] = useState([])
    const [userData, setUserData] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    // const [hasMore, setHasMore] = useState(true)
    // const [loadSuccess, setLoadSuccess] = useState(false)
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
    },[])
    {/*const fetchMoreData = async () => {*/}
    {/*    if (listData?.length >= listRes?.pageNation?.total) {*/}
    //         setHasMore(false)
    //         return;
    //     }
    //     setLoadSuccess(true)
    {/*    if (totalPage <=  currentPage) {*/}
    {/*        currentPage = 2*/}
    {/*        return*/}
    {/*    }*/}
    //     currentPage+=1
    //     try {
    {/*        const res = await apiGet('/blog/queryArticle', { page: currentPage })*/}
    //         if (!res.data.length) {
    //
    //         }
    //         setListData([...listData,...res.data])
    //     }catch (e) {
    //         setLoadSuccess(false)
    //         currentPage-=1
    //         message.error('网络异常！')
    //     }
    // }
    return (
        <div className='flex'>
            <div className='w-auto md:w-9/12 bg-white  md:mr-6 px-8 py-6'>
                {listData.length ?
                    <div>
                        {/*<InfiniteScroll*/}
                        {/*    dataLength={listData.length}*/}
                        {/*    next={fetchMoreData}*/}
                        {/*    hasMore={hasMore}*/}
                        {/*    loader={*/}
                        {/*        <div style={{ textAlign: "center",padding:"20px 0" }}>*/}
                        {/*            {loadSuccess?<Spin tip="加载中..."/>:*/}
                        {/*                <Button type="primary" onClick={fetchMoreData} icon={<ReloadOutlined/>} >重新加载</Button>}*/}
                        {/*        </div>*/}
                        {/*    }*/}
                        {/*    endMessage={*/}
                        {/*        <p style={{ textAlign: "center",padding:"20px 0" }}>*/}
                        {/*            <b>没有更多数据了</b>*/}
                        {/*        </p>*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    {*/}
                        {/*        listData?.map(item => {*/}
                        {/*            return <ListItem classifyData={classifyData} key={item.id} data={item} />*/}
                        {/*        })*/}
                        {/*    }*/}
                        {/*</InfiniteScroll>*/}
                        {
                            listData?.map(item => {
                                return <ListItem classifyData={classifyData} key={item.id} data={item} />
                            })
                        }
                        {
                            <Pagination defaultCurrent={currentPage} total={listRes?.pageNation?.total} hideOnSinglePage onChange={pageChange} />
                        }
                    </div> : <div className='flex justify-center items-center h-full w-full'>
                        <Spin />
                    </div>
                }

            </div>
            <div className='md:block hidden bg-white px-8 py-6 flex-1 sticky top-0'>
                <div>
                    <Row style={{ fontSize: '20px' }} className='text-gray-600 mb-6 flex'>
                        联系方式
                    </Row>
                    <Row className='flex justify-center'>
                        <Avatar src={userData.avatar} size={70} />
                    </Row>
                    <Row className='mb-6 flex justify-center text-lg'>
                        {userData.user_nickname}
                    </Row>
                    <Row className='mb-6 flex text-base items-center flex-nowrap overflow-ellipsis'>
                        <IconFont type='icon-Emailus' />&nbsp;&nbsp;
                        <span>Email</span>&nbsp;&nbsp;
                        <a href={'mailto:' + userData.email}>{userData.email}</a>
                    </Row>
                    <Row className='mb-6 flex text-base items-center'>
                        <IconFont type='icon-QQ' />&nbsp;&nbsp;
                        <span>QQ</span>&nbsp;&nbsp;
                        <a target="_blank" rel="noreferrer"
                            href="http://wpa.qq.com/msgrd?v=3&uin=1150066420&site=qq&menu=yes">1150066420</a>
                    </Row>
                    {/* <Row className='mb-6 flex text-base items-center'>
                        <IconFont type='icon-weixin' />&nbsp;&nbsp;
                        <span>微信</span>&nbsp;&nbsp;
                        <span>1150066420</span>
                    </Row> */}
                    <Row className='mb-6 flex text-base items-center'>
                        <IconFont type='icon-yinle' />&nbsp;&nbsp;
                        <span>网易云音乐</span>&nbsp;&nbsp;
                        <a href='https://music.163.com/#/playlist?id=321703385' target='_blank'
                            rel="noreferrer">321703385</a>
                    </Row>
                    <Row className='mb-6 flex text-base items-center'>
                        <IconFont type='icon-github' />&nbsp;&nbsp;
                        <span>GitHub</span>&nbsp;&nbsp;
                        <a href='https://github.com/Dunn-liu' target='_blank' rel="noreferrer">Dunn-liu</a>
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
