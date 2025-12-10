import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {GamesPage} from "./pages/GamesPage.tsx";
import {CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {theme} from "./config/theme/theme.ts";
import {MainContentContainer} from "./components/MainContentContainer.tsx";
import {AppLayout} from "./components/AppLayout.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/api";
import {GamePage} from "./pages/GamePage.tsx";
import {GamePageLoadingFallback} from "./pages/fallbacks/GamePageLoadingFallback.tsx";
import {ErrorCard} from "./components/cards/ErrorCard.tsx";
import {GamesPageLoadingFallback} from "./pages/fallbacks/GamesPageLoadingFallback.tsx";
import {FallbackWrapper} from "./components/FallbackWrapper.tsx";
import {UserConfigPage} from "./pages/UserConfigPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {FriendListPage} from "./pages/FriendListPage.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {RouteGuard} from "./components/identity/RouteGuard.tsx";
import {useInitSecurity} from "./hooks/security/useInitSecurity.tsx";

function App() {
    useInitSecurity();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <BrowserRouter>
                            <AppLayout mainContent={
                                <MainContentContainer>
                                    <Routes>
                                        <Route path="/"
                                               element={<Navigate to="/games"
                                                                  replace/>}/>
                                        <Route path={"/games"}
                                               element={
                                                   <FallbackWrapper
                                                       errorFallback={
                                                           <ErrorCard
                                                               title={"Ohnee..."}
                                                               description={"Er ging iets mis met het ophalen van games..."}
                                                           />
                                                       }
                                                       loadingFallback={
                                                           <GamesPageLoadingFallback/>
                                                       }
                                                   >
                                                       <GamesPage/>
                                                   </FallbackWrapper>
                                               }/>
                                        <Route
                                            path={"/games/:gameId"}
                                            element={
                                                <RouteGuard>
                                                    <FallbackWrapper
                                                        errorFallback={
                                                            <ErrorCard
                                                                title={"Ohnee..."}
                                                                description={"Er ging iets mis met het laden van deze pagina..."}
                                                            />
                                                        }
                                                        loadingFallback={
                                                            <GamePageLoadingFallback/>
                                                        }
                                                    >
                                                        <GamePage/>
                                                    </FallbackWrapper>
                                                </RouteGuard>
                                            }/>

                                        <Route
                                            path={"/profile/:userName"}
                                            element={
                                                <RouteGuard>
                                                    <FallbackWrapper
                                                        errorFallback={
                                                            <ErrorCard
                                                                title={"Ohnee..."}
                                                                description={"Er ging iets mis met het laden van deze pagina..."}
                                                            />
                                                        }
                                                        loadingFallback={
                                                            <Typography>FALLBACK</Typography>
                                                        }
                                                    >
                                                        <ProfilePage/>
                                                    </FallbackWrapper>
                                                </RouteGuard>
                                            }/>

                                        <Route
                                            path={"/userPreferences"}
                                            element={
                                                <RouteGuard>
                                                    <FallbackWrapper
                                                        errorFallback={
                                                            <ErrorCard
                                                                title={"Ohnee..."}
                                                                description={"Er ging iets mis met het laden van deze pagina..."}
                                                            />
                                                        }
                                                        loadingFallback={
                                                            <Typography>FALLBACK</Typography>
                                                        }
                                                    >
                                                        <UserConfigPage/>
                                                    </FallbackWrapper>
                                                </RouteGuard>
                                            }/>

                                        <Route
                                            path={"/friends"}
                                            element={
                                                <RouteGuard>
                                                    <FallbackWrapper
                                                        errorFallback={
                                                            <ErrorCard
                                                                title={"Ohnee..."}
                                                                description={"Er ging iets mis met het laden van deze pagina..."}
                                                            />
                                                        }
                                                        loadingFallback={
                                                            <Typography>FALLBACK</Typography>
                                                        }
                                                    >
                                                        <FriendListPage/>
                                                    </FallbackWrapper>
                                                </RouteGuard>
                                            }/>

                                    </Routes>
                                </MainContentContainer>
                            }/>
                        </BrowserRouter>
                    <ReactQueryDevtools initialIsOpen={false} />
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
