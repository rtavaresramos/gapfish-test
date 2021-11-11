import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { collection, getDocs } from '@firebase/firestore'
import { db } from '../../firebase'

export default function ShorLinkHandler() {

    const linksCollectionRef = collection(db, 'links')
    const { shortLink } = useParams();


    useEffect(() => {
        const getLinks = async () => {
            const data = await getDocs(linksCollectionRef)
            const url = data.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
            // eslint-disable-next-line 
            url.map(link => {
                if (link.linkId === shortLink) {
                    window.location.href = link.originalUrl
                }
            })

        }

        getLinks()
        // eslint-disable-next-line 
    }, [])
    return <></>
}
