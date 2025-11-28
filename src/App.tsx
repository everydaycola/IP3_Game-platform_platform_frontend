import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {GamesPage} from "./pages/GamesPage.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme/theme.ts";
import {MainContentContainer} from "./components/MainContentContainer.tsx";
import {AppLayout} from "./components/AppLayout.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/api";
import {GamePage} from "./pages/GamePage.tsx";
import {GamePageLoadingFallback} from "./pages/fallbacks/GamePageLoadingFallback.tsx";
import {ErrorCard} from "./components/ErrorCard.tsx";
import {GamesPageLoadingFallback} from "./pages/fallbacks/GamesPageLoadingFallback.tsx";
import {FallbackWrapper} from "./components/FallbackWrapper.tsx";
import {RouteGuard} from "./components/RouteGuard.tsx";
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <SecurityContextProvider>
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
                                    </Routes>
                                </MainContentContainer>
                            }/>
                        </BrowserRouter>
                    </SecurityContextProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
