import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GamesPage} from "./pages/GamesPage.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme/theme.ts";
import {MainContentContainer} from "./components/MainContentContainer.tsx";
import { AppLayout } from "./components/AppLayout.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/api";
import {GamePage} from "./pages/GamePage.tsx";

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
                                <Route path={"/"}
                                       element={<GamesPage/>}/>
                                <Route
                                    path={"/games/:gameId"}
                                    element={<GamePage/>}/>
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
