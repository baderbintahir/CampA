const user = JSON.parse(localStorage.getItem('profile'))

export const isAdmin = () => {

    if (user.result.roles.includes("Support") || user.result.roles.includes("Admin")) {
        return true
    } else{
        return false
    }
}

export const isSupport = () => {

    if (user.result.roles.includes("Support")) {
        return true
    } else{
        return false
    }
}