import { withRouter } from 'next/router'
import { Comment, Tooltip, List } from 'antd';
const about = ({ router }) => {
    return (
        <div className='bg-white'>
        About
        </div>
)
}
export default withRouter(about)