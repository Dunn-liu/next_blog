import {withRouter} from 'next/router'
import { useEffect } from 'react'
import styles from "../../../styles/Home.module.css";
import {VMdParser} from '@kangc/v-md-editor/lib/utils/v-md-parser'
import githubThemeParser from '@kangc/v-md-editor/lib/theme/github-parser'
import vueThemeParser from '@kangc/v-md-editor/lib/theme/vuepress-parser'
import {apiGet} from "../../utils/api";
const Article = ({router,res}) => {
    const parser = new VMdParser()
    parser.use(githubThemeParser).use(vueThemeParser,{
        codeHighlightExtensionMap: {
            vue: 'xml',
            react:'xml'
        },
    })
    res.data[0].article_content = parser.parse(res.data[0].article_content)
    return (
        <div  className={styles.content}>
            <div className="v-md-editor-preview github-markdown-body vuepress-markdown-body copy-code-mode" dangerouslySetInnerHTML={{__html:res.data[0].article_content}}></div>
        </div>
    )
}
Article.getInitialProps = async (ctx) => {
    const res = await apiGet('https://api.codespring.top/queryArticle',{id:50})
    return {res}
}
export default withRouter(Article)
