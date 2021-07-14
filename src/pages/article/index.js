import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { VMdParser } from '@kangc/v-md-editor/lib/utils/v-md-parser'
import githubThemeParser from '@kangc/v-md-editor/lib/theme/github-parser'
import vueThemeParser from '@kangc/v-md-editor/lib/theme/vuepress-parser'
import { apiGet } from "../../utils/api";
import moment from 'moment'
const Article = ({ router, res }) => {
    const parser = new VMdParser()
    const [html, setHtml] = useState('')
    parser.use(githubThemeParser).use(vueThemeParser, {
        codeHighlightExtensionMap: {
            vue: 'xml',
            react: 'xml'
        },
    })
    const newHtml = parser.parse(res?.data?.[0]?.article_content)
    useEffect(() => {
        setHtml(newHtml)
    }, [newHtml])
    return (
        <div>
            {res.data ?
                <div>
                    <div className="px-4 pt-4">
                        <div className="text-2xl font-bold text-gray-700 text-center">
                            {res?.data?.[0]?.article_title}
                        </div>
                        <div className="flex flex-col items-center">
                            <span className='text-base text-gray-500'>作者: {res?.data?.[0]?.author_nickname}</span>
                            <span className='text-base text-gray-500'>发布时间: {moment(res?.data?.[0]?.post_date).format('YYYY-MM-DD HH:mm:ss')}</span>
                        </div>
                    </div>
                    <div className="v-md-editor-preview github-markdown-body vuepress-markdown-body copy-code-mode" dangerouslySetInnerHTML={{ __html: html }}></div>
                </div> : <Spin />
            }
        </div>

    )
}
Article.getInitialProps = async (ctx) => {
    const { query } = ctx
    const res = await apiGet('/blog/getArticle', { id: query.id })
    return { res }
}
export default withRouter(Article)
