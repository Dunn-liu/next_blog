import {Button, Result} from "antd";
import {useRouter} from 'next/router'
import {MehTwoTone} from "@ant-design/icons";

const NoData = () => {
    const router = useRouter()
    return (
        <div className='flex justify-center w-full'>
            <Result
                icon={<MehTwoTone />}
                title="Hey, This is no data!"
                extra={<Button onClick={() => router.push({
                    pathname: '/',
                })} type="primary">back</Button>}
            />
        </div>
    )
}
export default NoData
