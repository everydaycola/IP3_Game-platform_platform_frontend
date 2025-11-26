import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {GamesPage} from "./pages/GamesPage.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme/theme.ts";
import {MainContentContainer} from "./components/MainContentContainer.tsx";
import {AppLayout} from "./components/AppLayout.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/api";
import {GamePage} from "./pages/GamePage.tsx";
import {Suspense} from "react";
import {GamePageLoadingFallback} from "./pages/fallbacks/GamePageLoadingFallback.tsx";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorCard} from "./components/ErrorCard.tsx";

function App() {

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
                                           element={<GamesPage/>}/>
                                    <Route
                                        path={"/games/:gameId"}
                                        element={
                                            <ErrorBoundary
                                                fallback={<ErrorCard title={"Ohnee..."}
                                                                     description={"Er ging iets mis met het laden van deze pagina..."}/>
                                                }>
                                                <Suspense fallback={<GamePageLoadingFallback/>}>
                                                    <GamePage/>
                                                </Suspense>
                                            </ErrorBoundary>
                                        }/>
                                </Routes>
                            </MainContentContainer>
                        }/>
                    </BrowserRouter>
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
