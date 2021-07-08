import Link from '../Link'
// import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'
import { SearchOutlined } from '@ant-design/icons';
import logo from '../../../public/logo.png'
import React, { useEffect, useRef, useState } from "react";
import { Input, message } from "antd";
function HeaderV1(props) {
    const { Search } = Input;
    const [searchWord, setSearchWord] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [mobile, setMobile] = useState(false)
    const searchRef = useRef(null)
    const isMobile = false
    useEffect(() => {
        // window.addEventListener('resize',() => {
        //     setMobile(isMobile())
        //     console.log('sss',isMobile())
        // })
        // return window.removeEventListener('resize',()=>{
        //     setMobile(isMobile())
        // })
        console.log('555')
    }, [isMobile])
    // const isMobile = () => {
    //     if(window.navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
    //         return true
    //     }else{
    //         return false
    //     }
    // }
    const onSearch = value => {
        if (!value.trim()) {
            message.warning({
                content: '输入点什么吧',
                duration: 1
            });
        } else {
            console.log(searchWord)
        }
    };
    const handlerShowSearch = (e) => {
        setShowSearch(true)
        e.stopPropagation()
    }
    const onChangeHandler = e => {
        setSearchWord(e.target.value.trim())
    }
    console.log(mobile)
    return (
        <div className={styles.header}>
            {mobile ? <div>123</div> : <div className={styles.headerContent}>
                <div className={styles.headerLogo}>
                    <Image src={logo} alt='logo' />
                    <div className={styles.logoTitle}>DunnBlog</div>
                </div>
                <div className={styles.headerNav}>
                    <Link activeClassName={styles.navItem} href='/'>
                        <a className='hover:text-blue-600'>首页</a>
                    </Link>
                    <Link activeClassName={styles.navItem} href='/state'>
                        <a className='hover:text-blue-600'>动态</a>
                    </Link>
                    <Link activeClassName={styles.navItem} href='/about'>
                        <a className='hover:text-blue-600'>关于</a>
                    </Link>
                </div>
            </div>}
        </div>
    )
}
export default HeaderV1