import React from 'react'
import IconSVG from '../IconSVG'
import { useSelector } from 'react-redux'
import { FaSignOutAlt } from "react-icons/fa";
import { signOutAuth } from '../../auth'

import './styles.css'
export default function UserCard() {
    const user = useSelector((state) => state.user.value)

    return (
        <div className="user__container">
            <div className="user__container--content">
                <div className="user__signout">
                    <h4 className="signout" onClick={signOutAuth}>
                        Sign Out
                        <FaSignOutAlt />
                    </h4>
                </div>
                <IconSVG />
                <h2 className="user__greeting">
                    Hi
                    <span className="user__name">
                        {user.name.split(' ').slice(0, 1)}
                    </span>
                    , we hope you enjoy it!
                </h2>
                <h2 className="user__welcome">
                    Nice to see you as a member, now your links will be saved on your account :D
                </h2>
            </div>
        </div>
    )
}
