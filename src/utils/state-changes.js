export const verifyIfWasChangedUserState = (userInitialState, user) => {
    const objOne = { ...userInitialState }
    const objTwo = { ...user }
    delete objOne['links']
    delete objOne['error']
    delete objTwo['links']
    delete objTwo['error']

    return JSON.stringify(objOne) !== JSON.stringify(objTwo)
}
