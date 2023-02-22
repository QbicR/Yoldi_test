import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'

import styles from './Header.module.css'
import { UserType } from '@/types/types'
import { fetcherWithToken } from '@/utils/fetcherWithToken'

const Header: React.FC = () => {
    const [token, setToken] = useState<string | null>()
    const [user, setUser] = useState<UserType>()
    const [letter, setLetter] = useState<string>('')

    const { push, route } = useRouter()

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [route])

    const { data } = useSWR('https://frontend-test-api.yoldi.agency/api/profile', (url: string) =>
        fetcherWithToken(url, token),
    )

    useEffect(() => {
        if (data) {
            setUser(data)
            setLetter(data?.name[0])
        }
    }, [data])

    const sendResuest = async (url: string) => {
        await fetch(url, {
            method: 'GET',
            headers: { accept: 'application/json', 'X-API-KEY': token! },
        }).then(async (res) => setUser(await res.json()))
    }

    const { trigger } = useSWRMutation(
        'https://frontend-test-api.yoldi.agency/api/profile',
        sendResuest,
    )

    useEffect(() => {
        if (token) {
            trigger()
        }
    }, [token])

    console.log(!user?.image?.url && user?.name[0])

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_container}>
                <div className={styles.logo}>
                    <svg
                        onClick={() => push('/users')}
                        className={styles.icon}
                        width="80"
                        height="50"
                        viewBox="0 0 80 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="80" height="50" fill="#FEFF80" />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.4874 34.2064C14.0664 34.2064 13.8291 33.978 13.8291 33.5713V26.4242L8.35002 17.1905C8.08577 16.7336 8.29627 16.4286 8.7964 16.4286H12.1689C12.5377 16.4286 12.7751 16.5818 12.9318 16.8854L15.9371 22.4307L18.9394 16.8854C19.0961 16.5818 19.3335 16.4286 19.7022 16.4286H23.0748C23.5749 16.4286 23.7854 16.7336 23.5226 17.1905L18.0436 26.4242V34.1902"
                            fill="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M67.9146 33.571V22.1433C67.9146 21.736 68.1456 21.508 68.5565 21.508H71.1228C71.5338 21.508 71.7648 21.736 71.7648 22.1433V33.571C71.7648 33.9768 71.5338 34.2064 71.1228 34.2064H68.5565C68.1456 34.2064 67.9146 33.9768 67.9146 33.571Z"
                            fill="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M31.8336 28.4937C31.8336 26.7868 30.5005 25.6557 28.7688 25.6557C27.0372 25.6557 25.7056 26.7868 25.7056 28.4937C25.7056 30.2006 27.0372 31.3301 28.7688 31.3301C30.5005 31.3301 31.8336 30.2006 31.8336 28.4937ZM21.7114 28.4937C21.7114 24.9101 24.8529 22.143 28.7695 22.143C32.686 22.143 35.829 24.9101 35.829 28.4937C35.829 32.0773 32.686 34.8414 28.7695 34.8414C24.8529 34.8414 21.7114 32.0773 21.7114 28.4937Z"
                            fill="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M39.6797 34.2064V17.0821C39.6797 16.6646 39.9115 16.4286 40.3212 16.4286H42.887C43.2981 16.4286 43.5299 16.6646 43.5299 17.0821V33.5573C43.5299 33.9718 43.2981 34.2064 42.887 34.2064"
                            fill="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M60.0499 25.3183C60.0499 22.2701 58.0686 20.3382 55.2016 20.3382H51.551V30.2955H55.2016C58.0686 30.2955 60.0499 28.3636 60.0499 25.3183ZM55.2016 16.4286C60.2318 16.4286 64.0643 20.2879 64.0643 25.3182C64.0643 30.3456 60.2318 34.2064 55.2016 34.2064H48.684H48.0319C47.6135 34.2064 47.3799 33.9763 47.3799 33.5723V17.0627C47.3799 16.6572 47.6135 16.4286 48.0319 16.4286"
                            fill="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M67.9146 18.9287V17.1031C67.9146 16.6707 68.1456 16.4286 68.5565 16.4286H71.1228C71.5338 16.4286 71.7648 16.6707 71.7648 17.1031V18.9287C71.7648 19.3595 71.5338 19.6032 71.1228 19.6032H68.5565C68.1456 19.6032 67.9146 19.3595 67.9146 18.9287Z"
                            fill="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M26.8442 18.9287V17.1031C26.8442 16.6707 27.0781 16.4286 27.4941 16.4286H35.1783C35.5943 16.4286 35.8282 16.6707 35.8282 17.1031V18.9287C35.8282 19.3595 35.5943 19.6032 35.1783 19.6032H27.4941C27.0781 19.6032 26.8442 19.3595 26.8442 18.9287Z"
                            fill="black"
                        />
                    </svg>
                    <p className={styles.desc}>Разрабатываем и запускаем сложные веб проекты</p>
                </div>
                {!token ? (
                    <button onClick={() => push('/login')} className={styles.btn}>
                        Войти
                    </button>
                ) : (
                    <div onClick={() => push(`/users/${user?.slug}`)} className={styles.user_info}>
                        {user && (
                            <>
                                <h4 className={styles.user_name}>{user?.name}</h4>
                                <div
                                    className={styles.user_icon}
                                    style={{ backgroundImage: `url(${user?.image?.url})` }}
                                >
                                    {!user?.image?.url && user?.name[0]}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
