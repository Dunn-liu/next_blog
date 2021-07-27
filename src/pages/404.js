import { Result, Button, Image } from 'antd';
import Link from 'next/link'
import gif from '../../public/404.gif'
export default function Custom404() {
    return (<div className='flex flex-col items-center justify-center py-14 bg-white'>
        <Image preview={false} src={gif.src} ></Image>
        <div className='my-6 text-xl'>
            Sorry，找不到你想要的页面
        </div>
        <div>
            <Button type="primary"><Link href='/'><a>回首页</a></Link></Button>
        </div>
    </div>)
}
