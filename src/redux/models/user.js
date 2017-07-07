export function isUserSignedIn(state) {
    // console.log(state);
    return state.auth.isAuthenticated;
}
