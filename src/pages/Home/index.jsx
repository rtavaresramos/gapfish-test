import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero';
import Navbar from '../../components/Navbar';
import SignForm from '../../components/SignForm';
import UserCard from '../../components/UserCard';
import { useSelector, useDispatch } from 'react-redux'
import { userInitialState, setUser } from '../../store/user'
import { verifyIfWasChangedUserState } from '../../utils/state-changes'
import { useAuth } from '../../firebase'


import './styles.css'

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)
  const [loggedUser, setLoggedUser] = useState(false)

  const currentUser = useAuth()

  useEffect(() => {
    setLoggedUser(verifyIfWasChangedUserState(userInitialState, user))
    // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if (currentUser) {
      const { displayName, email, uid } = currentUser
      // eslint-disable-next-line
      dispatch(setUser({ name: displayName || 'there', email, uid }))
    }
    // eslint-disable-next-line
  }, [currentUser])


  return <div className="home__container container">
    <Navbar />
    <div className="home__content">
      <div className="home__content--hero">
        <Hero />
      </div>
      <div className="fade__in--right">
        {!loggedUser ?
          <SignForm />
          : <UserCard />}
      </div>
    </div>
    <h4 className="made-with-love" >made with ♥ by Rodrigo Tavares </h4>
  </div>
}

export default Home;