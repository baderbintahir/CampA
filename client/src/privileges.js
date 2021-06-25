export const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if (user.result.roles === "Support" || user.result.roles === "Admin") {
        return true
    } else{
        return false
    }
}

export const isSupport = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if (user.result.roles === "Support") {
        return true
    } else{
        return false
    }
}