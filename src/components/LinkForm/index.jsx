import React, { useState } from 'react'
import './styles.css'
export default function LinkForm({ pushLink }) {
    const [inputText, setInputText] = useState('')
    const [error, setError] = useState('')

    const handleClick = () => {
        isValidUrl(inputText) && pushLink(inputText)
        setInputText('')
    }
    const isValidUrl = (url) => {
        try {
            new URL(url);
        } catch (e) {
            setError(e.message);
            return false;
        }
        return true;
    };


    const handleKey = (e) => {
        if (e.key === 'Enter') handleClick()
    }

    const handleChange = (e) => {
        e.target.value.trim() === '' && setError('')
        setInputText(e.target.value)
    }
    return (
        <>
            <div className="form__container--link search__wrapper">
                <input
                    type="text"
                    placeholder="Enter your url here..."
                    required
                    value={inputText}
                    onChange={handleChange}
                    className="link__input"
                    onKeyDown={handleKey} />
                <button className="link__button" onClick={handleClick} >Get Started</button>
            </div>
            {error !== '' && <span className="error">{error.replace('URL constructor:', '')}</span>}
        </>

    )
}
