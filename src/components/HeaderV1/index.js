import Link from '../Link'
import Image from 'next/image'
import styles from './index.module.scss'
import { SearchOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import logo from '../../../public/logo.png'
import React, { useEffect, useRef, useState } from "react";
import { Input, message, Menu, Dropdown, } from "antd";
function HeaderV1(props) {
    const { Search } = Input;
    const [searchWord, setSearchWord] = useState('')
    const searchRef = useRef(null)
    const menu = (
        <Menu>
            <Menu.Item>
                <Link href='/' activeClassName={styles.navItem}>
                    <a className='hover:text-blue-600 text-sm font-medium'>首页</a>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href='/state' activeClassName={styles.navItem}>
                    <a className='hover:text-blue-600 text-sm font-medium'>动态</a>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href='/about' activeClassName={styles.navItem}>
                    <a className='hover:text-blue-600 text-sm font-medium'>关于</a>
                </Link>
            </Menu.Item>
        </Menu>
    );
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
    return (
        <div className='mx-auto md:w-3/5 md:px-0 px-4 h-16 flex items-center'>
            <div className='h-12 flex items-center mr-4'>
                <Image width={45} height={45} src={logo} alt='logo' />
            </div>
            <div className='md:block hidden ml-12'>
                <Link href='/' activeClassName={styles.navItem}>
                    <a className='hover:text-blue-600 text-xl font-medium mr-6'>首页</a>
                </Link>
                <Link href='/state' activeClassName={styles.navItem}>
                    <a className='hover:text-blue-600 text-xl font-medium mr-6'>动态</a>
                </Link>
                <Link href='/about' activeClassName={styles.navItem}>
                    <a className='hover:text-blue-600 text-xl font-medium mr-6'>关于</a>
                </Link>
            </div>
            <Search placeholder="输入您想搜索的内容" onSearch={onSearch} className='md:hidden mr-4' />
            <Dropdown overlay={menu} placement="bottomCenter">
                <MenuUnfoldOutlined className='text-lg md:hidden' />
            </Dropdown>
        </div>
    )
}
export default HeaderV1