export const verifyIfWasChangedUserState = (userInitialState, user) => {
    const objOne = { uid: userInitialState.uid, name: userInitialState.name, email: userInitialState.email }
    const objTwo = { uid: user.uid, name: user.name, email: user.email }

    return JSON.stringify(objOne) !== JSON.stringify(objTwo)
}
