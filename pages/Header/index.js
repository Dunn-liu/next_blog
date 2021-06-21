import {useState,useEffect,useRef} from 'react'
import {NavLink,HashRouter as Router} from 'react-router-dom'
import {Input, message, notification} from 'antd'
import {SearchOutlined} from '@ant-design/icons';
import './index.less';
import {apiGetClassify} from '@/api/article'
const MyHeader = (props)=>{
    const { Search } = Input;
    const [searchWord,setSearchWord] = useState('')
    const [classifyData,setClassifyData] = useState([])
    const [showSearch,setShowSearch] = useState(false)
    const searchRef = useRef(null)
   useEffect( ()=>{
       const fetchData = async ()=> {
           const res = await apiGetClassify()
           res&&res.data&&setClassifyData(res.data)
       }
       try{
           fetchData()
       }catch (e) {
           notification.error({
               message:'错误',
               description:'网络似乎出小差了,请刷新再试!',
               placement:'topRight'
           })
       }
       const handler = (e) =>{
           const res = searchRef.current&&searchRef.current.contains(e.target)
           if (!res) {
               setShowSearch(false)
           }
       }
       document.addEventListener('click',handler)
       return function (){
           document.removeEventListener('click',handler)
       }
   },[])
    const onSearch = value => {
        if(!value.trim()){
            message.warning({
                content:'输入点什么吧',
                duration:1
            });
        }else{
            console.log(searchWord)
        }
    };
    const handlerShowSearch=(e)=>{
        setShowSearch(true)
        e.stopPropagation()
    }
    const onChangeHandler = e=>{
        setSearchWord(e.target.value.trim())
    }
    return (<div className='m_header'>
        <div className={`m_header_top ${props.isFixed? 'visible':''}`}>
                  <div className="container">
                      <img className={`logo ${props.isMobile ? 'mobile' : ''}`} src={logo} alt=""/>
                      <div className="blog_title">DunnBlog</div>
                      <div className={`nav ${props.isMobile ? 'mobile' : ''}`}>
                          <Router>
                              <NavLink className='nav_item' to='/home' activeClassName="selected">首页</NavLink>
                              <NavLink className='nav_item' to='/state' activeClassName="selected">动态</NavLink>
                              <NavLink className='nav_item' to='/about' activeClassName="selected">关于</NavLink>
                          </Router>
                      </div>
                      {props.isMobile?<SearchOutlined onClick={(e)=>handlerShowSearch(e)} style={{color:'#007fff'}}/>:
                          <div className='search_bar'>
                              <Search
                                  className={props.isMobile?'mobileSearch':''}
                                  value={searchWord}
                                  placeholder="输入要搜索的内容"
                                  enterButton="搜索"
                                  onChange={onChangeHandler}
                                  onSearch={onSearch}
                              />
                          </div>
                      }
                  </div>
            {/*{*/}
            {/*    props.isMobile?null:<div className="player">*/}
            {/*        <iframe frameBorder="no" border="0" marginWidth="0" marginHeight="0" title='music163' width='300'*/}
            {/*                height='52' src="//music.163.com/outchain/player?type=0&id=321703385&auto=1&height=32"></iframe>*/}
            {/*    </div>*/}
            {/*}*/}
             </div>
             <div className={`tags ${props.isFixed? 'top':''}`}>
                 <div className="container">
                     <Router>
                         <NavLink activeClassName="selected" className='tag_item' to='/home' >推荐</NavLink>
                         {classifyData&&classifyData.map(item=>{
                             return (<NavLink activeClassName="selected" className='tag_item' key={item.id} to={'/articleList/'+item.id}>
                                 {item.classifyName}
                             </NavLink>)
                         })}
                     </Router>
                 </div>
             </div>
        {showSearch?<div className="mobileSearch" ref={searchRef}>
            <Search
                value={searchWord}
                placeholder="输入要搜索的内容"
                enterButton="搜索"
                onChange={onChangeHandler}
                onSearch={onSearch}
            />
        </div>:null}
    </div>)
}
export default MyHeader
