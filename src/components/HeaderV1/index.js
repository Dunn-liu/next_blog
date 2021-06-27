import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'
import {SearchOutlined} from '@ant-design/icons';
import logo from '../../../public/logo.png'
import React, {useEffect, useRef, useState} from "react";
import {Input,message} from "antd";
function HeaderV1(props) {
    const { Search } = Input;
    const [searchWord,setSearchWord] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const searchRef = useRef(null)
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
    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.headerLogo}>
                    <Image src={logo} />
                    <div className={styles.logoTitle}>DunnBlog</div>
                </div>
                <div className={styles.headerNav}>
                    <Link className={styles.navItem} href='/'>
                        <a>首页</a>
                    </Link>
                    <Link className={styles.navItem} href='/state'><a>动态</a></Link>
                    <Link className={styles.navItem} href='/about'><a>关于</a></Link>
                </div>
            </div>
        </div>
    )
}
export default HeaderV1