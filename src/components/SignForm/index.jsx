import React, { useState, } from 'react'
import { useSelector } from 'react-redux'
import { signInAuth, signUpAuth } from '../../auth'
import { isAValidSign } from '../../utils/sign-error'

import './styles.css'
export default function SignForm() {
    const signUser = useSelector((state) => state.user.value)
    const signInfoInitialState = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }
    const [formPage, setFormPage] = useState(true)
    const [signInfo, setSignInfo] = useState(signInfoInitialState)


    const handleChangeFormPage = page => {
        setFormPage(page)
    }

    const handleChangeName = e => {
        setSignInfo({ ...signInfo, name: e.target.value })
    }
    const handleChangeEmail = e => {
        setSignInfo({ ...signInfo, email: e.target.value })
    }
    const handleChangePassword = e => {
        setSignInfo({ ...signInfo, password: e.target.value })
    }
    const handleChangePasswordConfirmation = e => {
        setSignInfo({ ...signInfo, passwordConfirmation: e.target.value })
    }

    const handleForm = () => {
        console.log('> form-error: ', isAValidSign(formPage, signInfo))
        if (isAValidSign(formPage, signInfo)) {
            formPage ?
                signInAuth(signInfo.email, signInfo.password) :
                signUpAuth(signInfo)
        }
    }


    return (
        <div className="form__container--sign-in">
            <div className="form__header">
                <label htmlFor="sign-in" className={formPage ? 'active' : ''}>Sign In</label>
                <label htmlFor="sign-up" className={!formPage ? 'active' : ''}>Sign Up</label>
                <input hidden type="radio" name="form-page" id="sign-in" onChange={() => handleChangeFormPage(true)} />
                <input hidden type="radio" name="form-page" id="sign-up" onChange={() => handleChangeFormPage(false)} />
            </div>
            <div className="form__content">
                {!formPage && <><label htmlFor="name">Name</label>
                    <input id='name' type="text" value={signInfo.name} onChange={handleChangeName} /></>}

                <label htmlFor="email">Email</label>
                <input id='email' value={signInfo.email} onChange={handleChangeEmail} type="text" />
                <label htmlFor="password">Password</label>
                <input id='password' value={signInfo.password} onChange={handleChangePassword} type="password" />

                {!formPage && <><label htmlFor="password">Confirm password</label>
                    <input id='passwordConfirmation' type="password" value={signInfo.passwordConfirmation} onChange={handleChangePasswordConfirmation} /></>}

                <button className="enter__btn" onClick={handleForm}>{formPage ? 'Entrar' : 'Registrar-se'}</button>
            </div>
            <span className="error break-words">{signUser.error}</span>
        </div>
    )
}
