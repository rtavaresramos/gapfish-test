import React from 'react'
import { Link } from "react-router-dom";
import { FaLink, FaRegCopy, FaRegCheckCircle } from "react-icons/fa";

import './styles.css'
export default function NewLinks({ link, clipboardText, changeClipboardText }) {
    const handleCopyLink = async () => {
        navigator.clipboard.writeText(link.shortUrl)
        changeClipboardText(link.shortUrl)
    }
    return (
        <>
            <div className="short-link__container">
                <FaLink className="link__icon" />
                <Link to={`${link.linkId}`} target="_blank">{link.shortUrl}</Link>
                <FaRegCopy className="copy__icon" onClick={handleCopyLink} />
                {link.shortUrl === clipboardText && <span className="copied-link" > <FaRegCheckCircle /> Copied to clipboard</span>}
            </div>
            <div className="source-link__container">
                <span className="source__link">{link.originalUrl}</span>
            </div>
        </>
    )
}
