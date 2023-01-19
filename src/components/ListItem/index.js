import { Image, Tooltip } from 'antd'
import Link from 'next/link'
import React from "react";
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import {filter} from 'lodash'
import CountUp from 'react-countup'
import loadingGif from '../../../public/imageLoading.gif'
import fail from '../../../public/fail.png'
const ListItem = ({ data, classifyData }) => {
  const curClassifyArr = data?.classifyId?.split(',').map(item => filter(classifyData, ['id', Number(item)])[0])
  return (
    <div className="max-w-md p-4 mx-auto mb-4 overflow-hidden bg-white bg-opacity-75 border-b border-gray-300 border-solid md:max-w-4xl">
      <div className="items-center md:flex">
        <LazyLoad width={128} height={112} offset={300} style={{textAlign: 'center'}}>
          <Image preview={false} className='object-contain w-full rounded h-28 md:w-36 md:flex-shrink-0'
                 style={{maxWidth: 'none'}}
            fallback={fail.src}
            placeholder={
                     <Image
                         className='object-contain w-full rounded h-28 md:w-32 md:flex-shrink'
                         style={{maxWidth: 'none'}}
                         preview={false}
                         src={loadingGif.src}
                     />
            }
            src={data.article_cover} alt={data?.article_title} />
        </LazyLoad>
        <div className='md:ml-4'>
          <Link href={{
            pathname: `/article/${data?.id}.html`,
          }}
          scroll={false}
          >
            <a className="block mt-1 text-lg font-medium leading-tight text-black hover:underline">{data?.article_title}</a>
          </Link>
          <div className='flex flex-col flex-wrap my-1 md:items-center md:flex-row'><span className='md:mr-3'>更新时间:&nbsp;&nbsp;{moment(data?.post_date).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
          <div className='mb-1'>
            <span>作者:&nbsp;&nbsp;{data?.author_nickname}</span>
          </div>
          {/*<div className='mb-2'>*/}
            <div className='mb-1'>
              分类:&nbsp;&nbsp;
              {
                curClassifyArr.map(item => {
                  return <span className='mr-2' key={item.id}>{item.classifyName}</span>
                })
              }
            </div>
            <div className='mb-1'>
              阅读:&nbsp;&nbsp;
              <span className='text-yellow-500'>
                <CountUp end={data?.view_count} />
              </span>
            </div>
          <Tooltip title={data?.article_abstract}>
            <p className="text-gray-500 truncate w-72">{data?.article_abstract}</p>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
export default ListItem
