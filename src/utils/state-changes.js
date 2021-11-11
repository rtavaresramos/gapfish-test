export const verifyIfWasChangedUserState = (userInitialState, user) => {
    const objOne = { ...userInitialState }
    const objTwo = { ...user }
    delete objOne['links']
    delete objTwo['links']

    return JSON.stringify(objOne) !== JSON.stringify(objTwo)
}
