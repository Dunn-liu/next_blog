import {withRouter} from 'next/router'
const article = ({router}) => {
    return (
        <div>文章{router.query.id}</div>
    )
}
export default withRouter(article)
