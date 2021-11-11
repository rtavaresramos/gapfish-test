import React, { useState, useEffect } from 'react'
import LinkForm from '../LinkForm'
import NewLinks from '../NewLinks'
import { collection, addDoc, getDocs } from '@firebase/firestore'
import { db } from '../../firebase'
import { generateShortLink } from '../../utils'
import { useSelector, useDispatch } from 'react-redux'
import { userInitialState, setLinks } from '../../store/user'
import './styles.css'

export default function Hero() {
  const [shortLinks, setShortLinks] = useState([])
  const [refreshData, setRefreshData] = useState(false)
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  const [clipboardText, setClipboardText] = useState('')
  const linksCollectionRef = collection(db, 'links')


  useEffect(() => {
    setShortLinks(user.links || [])
    setRefreshData(verifyIfWasChangedUserState())
    // eslint-disable-next-line 
  }, [user])

  useEffect(() => {
    const getLinks = async () => {
      const arr = []
      const data = await getDocs(linksCollectionRef)
      const url = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
      // eslint-disable-next-line 
      url.map(link => {
        if (link.userUid === user.uid) {
          arr.push(link)
        }
      })
      dispatch(setLinks({ links: arr }))
    }

    refreshData && getLinks()
    // eslint-disable-next-line 
  }, [refreshData])

  const addLink = originalUrl => {
    let list = shortLinks
    console.log('> hero curList 1: ', shortLinks)
    const value = generateShortLink(originalUrl)
    list = [value, ...list]
    const newLink = user ? { ...value, userUid: user.uid } : { ...value, userUid: '' }
    createShortUrl(list, { ...newLink })
  }

  const handleChangeClipboardText = text => {
    setClipboardText(text)
  }

  const createShortUrl = async (list, payload) => {
    await addDoc(linksCollectionRef, payload)
    dispatch(setLinks({ links: list }))
  }

  const verifyIfWasChangedUserState = () => {
    const objOne = { ...userInitialState }
    const objTwo = { ...user }
    delete objOne['links']
    delete objTwo['links']

    return JSON.stringify(objOne) !== JSON.stringify(objTwo)
  }

  return (
    <div className="hero__container">
      <h1>Do you have a link and is it too big?</h1>
      <p>How about if we shorten it?</p>
      <LinkForm pushLink={addLink} />
      <h3 className={shortLinks.length > 0 ? 'active' : ''}>You did it! Nice, just try yours and share!</h3>
      <div className="link-list__container">
        {shortLinks.length > 0 && shortLinks.map((link, key) =>
          <NewLinks
            key={key}
            link={link}
            clipboardText={clipboardText}
            changeClipboardText={handleChangeClipboardText}
          />
        )}
      </div>
    </div>
  )
}


