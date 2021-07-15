import { Image, Tag } from 'antd'
import Link from 'next/link'
import React from "react";
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import _ from 'lodash'
import loadingGif from '../../../public/imageLoading.gif'
import fail from '../../../public/fail.png'
const ListItem = ({ data, classifyData }) => {
  const curClassifyArr = data?.classifyId?.split(',').map(item => _.filter(classifyData, ['id', Number(item)])[0])
  return (
    <div className="max-w-md mx-auto bg-white border-solid border-b border-gray-300 overflow-hidden md:max-w-4xl mb-4 p-4">
      <div className="md:flex items-center">
        <LazyLoad width={128} height={112}>
          <Image preview={false} className='h-28 w-full object-cover md:w-32 md:flex-shrink-0 rounded'
            fallback={fail.src}
            placeholder={
                     <Image
                         className='h-28 w-full object-cover md:w-32 md:flex-shrink rounded'
                         preview={false}
                         src={loadingGif.src}
                     />
            }
            src={data.article_cover} alt={data?.article_title} />
        </LazyLoad>
        <div className='md:ml-4'>
          <Link href={{
            pathname: '/article',
            query: { id: data?.id },
          }}>
            <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{data?.article_title}</a>
          </Link>
          <div className='flex md:items-center flex-wrap flex-col my-2 md:flex-row'><span className='md:mr-3'>更新时间:&nbsp;&nbsp;{moment(data?.post_date).format('YYYY-MM-DD HH:mm:ss')}</span>
            <span>作者:&nbsp;&nbsp;{data?.author_nickname}</span>
          </div>
          <div className='mb-2'>
            分类:&nbsp;&nbsp;
            {
              curClassifyArr.map(item => {
                return <Tag key={item.id}>{item.classifyName}</Tag>
              })
            }
          </div>
          <p className=" text-gray-500 overflow-ellipsis">{data?.article_abstract}</p>
        </div>
      </div>
    </div>
  )
}
export default ListItem
