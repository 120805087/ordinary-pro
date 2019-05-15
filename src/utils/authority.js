export function getAuthority(str) {
    const authorityString = typeof str === 'undefined' ? localStorage.getItem('ordinary-pro-authority') : str;

    let authority;
    try {
        authority = JSON.parse(authorityString);
    } catch (e) {
        authority = authorityString;
    }

    return authority;
}

export function setAuthority(authority) {
    return localStorage.setItem('ordinary-pro-authority', authority)
}

export function clearAuthority() {
    return localStorage.clear()
}
