import {Typography, Stack, Avatar, Button} from "@mui/material";
import {ThemeControls} from "../components/ThemeControls.tsx";
import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import {Navigate} from "react-router-dom";

export function UserConfigPage() {
    const {isAuthenticated, isInitialised, loggedInUser, logout, login} = useContext(SecurityContext)

    // If not authenticated, redirect to Games page
    if (isInitialised && !isAuthenticated()) {
        return <Navigate to="/games" replace />
    }

    return (
        <>
            <Stack direction="row" justifyContent="flex-end">
                <Button sx={{ width: "25%" }} variant="contained" color="secondary" onClick={isAuthenticated() ? logout : login}>
                    {isAuthenticated() ? "Uitloggen" : "Inloggen"}
                </Button>
            </Stack>

            <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                sx={{
                    mt:2,
                    minHeight: "50%"
                }}
            >
                <Stack
                    direction={"column"}
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Avatar
                        alt="Placeholder"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99-ZMZeEtYlFVdT-HN3Hz0f_i64Zf76D67g&s"
                        sx={{width: 150, height: 150}}
                    />
                    <Typography
                        variant={"h4"}
                        sx={{mt: 2}}
                    >
                        {loggedInUser?.name || loggedInUser?.username || "Gebruiker"}
                    </Typography>
                    {loggedInUser?.email && (
                        <Typography variant={"subtitle1"} sx={{mt:1}}>
                            {loggedInUser.email}
                        </Typography>
                    )}
                </Stack>
                <Stack direction={"column"}
                       sx={{
                           flex: 1,
                           p: 2
                       }}
                >
                    <Typography
                        variant={"h4"}
                        sx={{
                            width: "100%"
                        }}
                    >
                        Uw voorkeuren beheren
                    </Typography>
                    {loggedInUser && (
                        <Stack direction={"column"} sx={{mt:2}}>
                            {(loggedInUser.firstName || loggedInUser.lastName) && (
                                <Typography>
                                    Naam: {[loggedInUser.firstName, loggedInUser.lastName].filter(Boolean).join(" ")}
                                </Typography>
                            )}
                            {loggedInUser.username && (
                                <Typography>Gebruikersnaam: {loggedInUser.username}</Typography>
                            )}
                        </Stack>
                    )}
                    <Stack direction={"row"}
                           sx={{
                               display: "flex",
                               alignItems: "center",
                               justifyContent: "space-between",
                               mt:2
                           }}>
                        <Typography sx={{mr: 2}}>Thema:</Typography>
                        <ThemeControls/>
                    </Stack>
                    <Typography
                        variant={"h6"}
                        fontWeight={"bold"}
                        sx={{mt: 2}}
                    >
                        Notificaties
                    </Typography>
                    {/*<Stack direction={"row"}*/}
                    {/*       alignItems={"center"}>*/}
                    {/*    Meldingen binnen het platform ontvangen?*/}
                    {/*    <Checkbox/>*/}
                    {/*</Stack>*/}
                    {/*<Stack direction={"row"}*/}
                    {/*       alignItems={"center"}>*/}
                    {/*    Meldingen via e-mail ontvangen?*/}
                    {/*    <Checkbox/>*/}
                    {/*</Stack>*/}
                </Stack>

            </Stack>
        </>
    )
}