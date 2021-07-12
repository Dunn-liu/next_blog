import { withRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { apiGet } from "../../utils/api";
import ListItem from './../../components/ListItem/index';
const SearchResult = ({ classifyRes, listRes }) => {
  const [listData, setListData] = useState([])
  const [classifyData, setClassifyData] = useState([])
  useEffect(() => {
    setListData(listRes?.data)
    setClassifyData(classifyRes?.data)
  }, [classifyRes?.data, listRes?.data])
  const pageChange = async (page) => {
    const res = await apiGet('/blog/queryArticle', { page })
    setListData(res.data)
  }
  return (
    <div className='flex'>
      <div className='w-full px-8 py-6'>
        {
          listData?.map(item => {
            return <ListItem classifyData={classifyData} key={item.id} data={item} />
          })
        }
        <Pagination defaultCurrent={1} total={listRes?.pageNation?.total} hideOnSinglePage onChange={pageChange} />
      </div>
    </div>
  )
}
SearchResult.getInitialProps = async (ctx) => {
  const { query } = ctx
  const classifyRes = await apiGet('/articleClassify')
  const listRes = await apiGet('/blog/queryArticle', { keyword: query.keyword || '' })
  return { classifyRes, listRes }
}
export default withRouter(SearchResult)