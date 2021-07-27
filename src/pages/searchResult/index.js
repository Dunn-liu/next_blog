import { withRouter, useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { apiGet } from "../../utils/api";
import ListItem from './../../components/ListItem/index';
import NoData from './../../components/NoData/index';
const SearchResult = ({ classifyRes, listRes }) => {
  const router = useRouter()
  const { query: { keyword, classifyId } } = router
  const [listData, setListData] = useState([])
  const [classifyData, setClassifyData] = useState([])
  useEffect(() => {
    setListData(listRes?.data)
    setClassifyData(classifyRes?.data)
  }, [classifyRes?.data, listRes?.data])
  const pageChange = async (page) => {
    const res = await apiGet('/blog/queryArticle', { page, keyword, classifyId })
    setListData(res.data)
  }
  return (
    <div className='flex bg-white'>
      {
        listData.length ? <div className='w-full px-8 py-6'>
          {
            listData?.map(item => {
              return <ListItem classifyData={classifyData} key={item.id} data={item} />
            })
          }
          <Pagination className='max-w-md mx-auto md:max-w-4xl pl-4' defaultCurrent={1} total={listRes?.pageNation?.total} hideOnSinglePage onChange={pageChange} />
        </div> : <NoData />
      }
    </div>
  )
}

SearchResult.getInitialProps = async (ctx) => {
  const { query: { keyword, classifyId } } = ctx
  const classifyRes = await apiGet('/articleClassify')
  const listRes = await apiGet('/blog/queryArticle', { keyword, classifyId, page: 1 })
  return { classifyRes, listRes }
}
export default withRouter(SearchResult)
