import React, { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/router'
import Head from 'next/head'

import AuthButton from '@/components/UI/button/AuthButton'
import AuthInput from '@/components/UI/Input/AuthInput'
import styles from '../styles/Auth.module.css'

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [response, setResponse] = useState<any>({})

    const { push } = useRouter()

    const sendResuest = async (url: string, { arg }: any) => {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: 'application/json' },
            body: JSON.stringify(arg),
        }).then(async (res) => setResponse(await res.json()))
    }

    const { trigger } = useSWRMutation(
        'https://frontend-test-api.yoldi.agency/api/auth/sign-up',
        sendResuest,
    )

    const register = () => {
        trigger({ email, name, password })
        setLoading(true)
    }

    useEffect(() => {
        if (response?.value) {
            localStorage.setItem('token', response.value)
            setError('')
            setLoading(false)
            push('/users')
        } else {
            setError(response.message)
            setLoading(false)
        }
    }, [response])

    return (
        <>
            <Head>
                <title>Регистрация в Yoldi Agency</title>
                <meta property="og:title" content="Регистрация в Yoldi Agency" key="title" />
            </Head>

            <div className={styles.auth_page}>
                <div className={styles.register_form}>
                    <h1 className={styles.auth_title}>
                        Регистрация<br></br> в Yoldi Agency
                    </h1>
                    <div className={styles.svg_icons}>
                        <svg
                            className={styles.svg_icon_1}
                            width="17"
                            height="19"
                            viewBox="0 0 17 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.5 0.90625C5.48792 0.90625 3.03125 3.36291 3.03125 6.375C3.03125 8.25793 3.99255 9.9303 5.44824 10.916C2.66199 12.1123 0.6875 14.8772 0.6875 18.0938H2.25C2.25 14.6331 5.03931 11.8438 8.5 11.8438C11.9607 11.8438 14.75 14.6331 14.75 18.0938H16.3125C16.3125 14.8772 14.338 12.1123 11.5518 10.916C13.0074 9.9303 13.9688 8.25793 13.9688 6.375C13.9688 3.36291 11.5121 0.90625 8.5 0.90625ZM8.5 2.46875C10.6667 2.46875 12.4062 4.20825 12.4062 6.375C12.4062 8.54175 10.6667 10.2812 8.5 10.2812C6.33325 10.2812 4.59375 8.54175 4.59375 6.375C4.59375 4.20825 6.33325 2.46875 8.5 2.46875Z"
                                fill="black"
                            />
                        </svg>
                        <AuthInput
                            placeholder={'Имя'}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.svg_icons}>
                        <svg
                            className={styles.svg_icon_1}
                            width="21"
                            height="15"
                            viewBox="0 0 21 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.34375 0.25V14.3125H20.6562V0.25H0.34375ZM3.71289 1.8125H17.2871L10.5 6.3291L3.71289 1.8125ZM1.90625 2.49609L10.0605 7.94043L10.5 8.20898L10.9395 7.94043L19.0938 2.49609V12.75H1.90625V2.49609Z"
                                fill="black"
                            />
                        </svg>
                        <AuthInput
                            placeholder={'E-mail'}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.svg_icons}>
                        <svg
                            className={styles.svg_icon_1}
                            width="17"
                            height="21"
                            viewBox="0 0 17 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.5 0.34375C5.49707 0.34375 3.03125 2.80957 3.03125 5.8125V8.15625H0.6875V20.6562H16.3125V8.15625H13.9688V5.8125C13.9688 2.80957 11.5029 0.34375 8.5 0.34375ZM8.5 1.90625C10.6515 1.90625 12.4062 3.66101 12.4062 5.8125V8.15625H4.59375V5.8125C4.59375 3.66101 6.34851 1.90625 8.5 1.90625ZM2.25 9.71875H14.75V19.0938H2.25V9.71875Z"
                                fill="black"
                            />
                        </svg>
                        <AuthInput
                            placeholder={'Пароль'}
                            type={hidePassword ? 'password' : 'text'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <svg
                            onClick={() => setHidePassword(!hidePassword)}
                            className={styles.svg_icon_2}
                            width="25"
                            height="13"
                            viewBox="0 0 25 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5 0.25C5.98755 0.25 0.976562 5.9873 0.976562 5.9873L0.512695 6.5L0.976562 7.0127C0.976562 7.0127 5.54504 12.222 11.6211 12.7012C11.911 12.7378 12.2009 12.75 12.5 12.75C12.7991 12.75 13.089 12.7378 13.3789 12.7012C19.455 12.222 24.0234 7.0127 24.0234 7.0127L24.4873 6.5L24.0234 5.9873C24.0234 5.9873 19.0125 0.25 12.5 0.25ZM12.5 1.8125C14.2212 1.8125 15.8081 2.28247 17.1875 2.91113C17.6849 3.73511 17.9688 4.6842 17.9688 5.71875C17.9688 8.54163 15.8508 10.861 13.1104 11.1631C13.0951 11.1661 13.0768 11.16 13.0615 11.1631C12.8754 11.1722 12.6892 11.1875 12.5 11.1875C12.2925 11.1875 12.0911 11.1753 11.8896 11.1631C9.14917 10.861 7.03125 8.54163 7.03125 5.71875C7.03125 4.69946 7.30591 3.75037 7.78809 2.93555H7.76367C9.15527 2.29468 10.7605 1.8125 12.5 1.8125ZM12.5 3.375C11.2061 3.375 10.1562 4.4248 10.1562 5.71875C10.1562 7.0127 11.2061 8.0625 12.5 8.0625C13.7939 8.0625 14.8438 7.0127 14.8438 5.71875C14.8438 4.4248 13.7939 3.375 12.5 3.375ZM5.66406 4.10742C5.54199 4.63232 5.46875 5.16028 5.46875 5.71875C5.46875 7.08899 5.85938 8.37073 6.54297 9.4541C4.57458 8.3158 3.2074 6.95776 2.75879 6.5C3.13416 6.11548 4.18091 5.09619 5.66406 4.10742ZM19.3359 4.10742C20.8191 5.09619 21.8658 6.11548 22.2412 6.5C21.7926 6.95776 20.4254 8.3158 18.457 9.4541C19.1406 8.37073 19.5312 7.08899 19.5312 5.71875C19.5312 5.16028 19.458 4.62622 19.3359 4.10742Z"
                                fill={hidePassword ? '#838383' : '#000'}
                            />
                        </svg>
                    </div>
                    <h4 className={styles.auth_form_error}>{error ? error : ''}</h4>
                    <AuthButton
                        disabled={!email || !password || !name}
                        onClick={register}
                        loading={loading}
                        text={'Создать аккаунт'}
                    />
                </div>
            </div>
        </>
    )
}

export default Register
