import {Typography, Stack, Avatar, Button, Card, useTheme} from "@mui/material";
import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import {Navigate} from "react-router-dom";
import {ThemeControls} from "../components/controls/ThemeControls.tsx";

export function UserConfigPage() {
    const {isAuthenticated, isInitialised, loggedInUser, logout, login} = useContext(SecurityContext)
    const theme = useTheme();
    if (isInitialised && !isAuthenticated()) {
        return <Navigate to="/games"
                         replace/>
    }

    return (
        <>
            <Card sx={{maxWidth: "100%", mx: 'auto', mt: 5, borderRadius: 3,p:4, overflow: 'hidden', color:theme.palette.primary.main}}>
                <Stack direction="row"
                       justifyContent="flex-end">
                    <Button sx={{width: "25%"}}
                            variant="contained"
                            color="secondary"
                            onClick={isAuthenticated() ? logout : login}>
                        {isAuthenticated() ? "Uitloggen" : "Inloggen"}
                    </Button>
                </Stack>

                <Stack
                    direction={{xs: "column", sm: "column", md: "row"}}
                    sx={{
                        mt: 2,
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
                            {loggedInUser?.username || "Gebruiker"}
                        </Typography>
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
                            <Stack direction={"column"}
                                   sx={{mt: 2}}>
                                {(loggedInUser.firstName || loggedInUser.lastName) && (
                                    <Typography>
                                        Naam: {[loggedInUser.firstName, loggedInUser.lastName].filter(Boolean).join(" ")}
                                    </Typography>
                                )}
                                {loggedInUser.username && (
                                    <Typography>Email: {loggedInUser.email}</Typography>
                                )}
                            </Stack>
                        )}
                        <Stack direction={"row"}
                               sx={{
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "space-between",
                                   mt: 2
                               }}>
                            <Typography sx={{mr: 2}}>Thema:</Typography>
                            <ThemeControls/>
                        </Stack>
                        <Typography
                            variant={"h6"}
                            fontWeight={"bold"}
                            sx={{mt: 2}}
                        >
                            Notificatie instellingen
                        </Typography>
                    </Stack>

                </Stack>
            </Card>
        </>
    )
}