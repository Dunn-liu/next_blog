import Link from '../Link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './index.module.scss'
import { SearchOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import logo from '../../../public/logo.png'
import React, { useEffect, useRef, useState } from "react";
import { Input, message, Menu, Dropdown, Drawer } from "antd";
function HeaderV1(props) {
    const { Search } = Input;
    const [searchLoading, setSearchLoading] = useState(false)
    const router = useRouter()
    const menu = (
        <Menu style={{ border: 'none' }}>
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
    const onSearch = (value) => {
        const searchWords = value.trim()
        if (!value.trim()) {
            message.warning({
                content: '输入点什么吧',
                duration: 1
            });
        } else {
            router.push({
                pathname: '/searchResult',
                query: {
                    keyword: searchWords
                }
            })
        }
    };
    return (
        <div className='mx-auto md:w-3/5 md:px-0 px-4 h-16 flex items-center'>
            <div className='h-12 flex items-center mr-4'>
                <Link href='/'>
                    <Image width={45} height={45} src={logo} alt='logo' />
                </Link>
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
            <Search maxLength='30' placeholder="输入您想搜索的内容" onSearch={onSearch} className='md:w-56 mr-4' loading={searchLoading} />
            <Drawer
                bodyStyle={{ padding: '20px 10px 0' }}
                width='24%'
                placement="right"
                closable={false}
                onClose={props.onClose}
                visible={props.visible}
            >{menu}</Drawer>
            <MenuUnfoldOutlined style={{ fontSize: '22px', color: '#08c' }} onClick={props.showDrawer} className='md:hidden' />
        </div>
    )
}
export default HeaderV1