import {type PropsWithChildren, useEffect, useState} from 'react'
import SecurityContext from './SecurityContext'
import Keycloak from 'keycloak-js'
import type {User} from "../models/user.ts";
import {isExpired} from 'react-jwt'
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader, notifyBackendUserLogin} from "../services/auth.ts";


const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
}

const keycloak: Keycloak = new Keycloak(keycloakConfig)

export default function SecurityContextProvider({children}: PropsWithChildren) {
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined)
    const [isInitialised, setIsInitialised] = useState(false)

    useEffect(() => {
        keycloak.init({onLoad: 'check-sso'})
    }, [])

    keycloak.onReady = () => {
        setIsInitialised(true)
    }

    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token)
        updateUserFromToken()
        notifyBackendUserLogin();
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
        setLoggedInUser(undefined)
    }

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(function () {
            addAccessTokenToAuthHeader(keycloak.token)
            updateUserFromToken()
        })
    }

    function login() {
        keycloak.login()
    }

    function logout() {
        // Clear local state immediately for responsiveness; Keycloak will handle session
        removeAccessTokenFromAuthHeader()
        setLoggedInUser(undefined)
        // After logging out at the IdP, return to the app's main page
        keycloak.logout({ redirectUri: window.location.origin })
    }

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token)
        else return false
    }

    function updateUserFromToken() {
        if (!keycloak.idTokenParsed || !keycloak.tokenParsed) return

        const preferredUsername = (keycloak.tokenParsed as any)["preferred_username"] as string | undefined
        const email = (keycloak.tokenParsed as any)["email"] as string | undefined
        const givenName = (keycloak.idTokenParsed as any)["given_name"] as string | undefined
        const familyName = (keycloak.idTokenParsed as any)["family_name"] as string | undefined
        const name = keycloak.idTokenParsed.given_name ?? preferredUsername ?? ""
        const realmRoles =
            keycloak.tokenParsed.realm_access?.roles ?? []

        setLoggedInUser({
            name,
            username: preferredUsername,
            email: email,
            firstName: givenName,
            lastName: familyName,
            roles: realmRoles,
        })
    }


    return (
        <SecurityContext.Provider
            value={{
                isInitialised,
                isAuthenticated,
                loggedInUser,
                login,
                logout,
            }}
        >
            {children}
        </SecurityContext.Provider>
    )
}
