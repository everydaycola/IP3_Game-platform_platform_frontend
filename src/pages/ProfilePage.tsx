import {Avatar, Box, Button, Card, CardContent,Stack, Typography, useTheme} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {usePlatformUser} from "../hooks/usePlatformUser.tsx";
import {useMediaQueries} from "../hooks/useMediaQueries.tsx";
import {useSecurityStore} from "../stores/securityStore.ts";

export function ProfilePage() {
    const theme = useTheme();
    const {userName} = useParams();
    const {platformUser} = usePlatformUser();
    const isAuthenticated = useSecurityStore((state) => state.isAuthenticated);
    const login = useSecurityStore((state) => state.login);
    const logout = useSecurityStore((state) => state.logout);
    const loggedInUser = useSecurityStore((state) => state.loggedInUser);
    const {isSmallScreen} = useMediaQueries();

    return (
        <Card sx={{maxWidth: "100%", mx: 'auto', mt: 5, borderRadius: 3, overflow: 'hidden'}}>
            <Box
                component="div"
                sx={{
                    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuq3joaHJkCS8gftpCUUR3Yg63O6kFWSO7fg&s)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    minHeight: 180,
                    height: 180,
                    position: "relative"
                }}
            >
                <Stack
                    direction={"row"}
                    sx={{
                        position:"absolute",
                        top:0,
                        right:0,
                        p:2
                    }}
                    gap={2}
                >
                    {loggedInUser?.username === userName &&
                        <Button
                            data-testid="preference-edit-button"
                            variant={"contained"}
                            component={Link}
                            to={"/userPreferences"}
                        >
                            Voorkeuren wijzigen
                        </Button>
                    }
                    <Button
                            variant="contained"
                            color="secondary"
                            onClick={isAuthenticated() ? logout : login}>
                        {isAuthenticated() ? "Uitloggen" : "Inloggen"}
                    </Button>
                </Stack>

            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: -8}}>
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        border: '3px solid white',
                        color: theme.palette.primary.contrastText
                    }}
                />
            </Box>

            <CardContent sx={{textAlign: 'center'}}>
                <Typography variant="h4"
                            color={theme.palette.primary.main}>
                    {userName}
                </Typography>

                <Stack
                    sx={{width:"100%"}}
                    direction={isSmallScreen? "column":"row"}
               >
                    <Box
                        sx={{
                            flex:3,
                            p: 2,
                            textAlign: "left",
                        }}
                    >
                        <Typography>
                            {platformUser.biography}
                        </Typography>
                    </Box>

                    {loggedInUser?.username === userName &&
                        <Box
                            sx={{
                                flex:1,
                                p: 2,
                                textAlign: "right",
                            }}
                        >
                            <Button
                                data-testid="friend-view-button"
                                variant="contained"
                                sx={{mt: 1}}
                                component={Link}
                                to={"/friends"}
                            >
                                Vrienden
                            </Button>
                        </Box>
                    }
                </Stack>
            </CardContent>
        </Card>

    )
}