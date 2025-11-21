import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GamesPage} from "./pages/GamesPage.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme/theme.ts";
import {MainContentContainer} from "./components/MainContentContainer.tsx";
import { AppLayout } from "./components/AppLayout.tsx";

function App() {

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <AppLayout mainContent={
                        <MainContentContainer>
                            <Routes>
                                <Route path={"/"}
                                       element={<GamesPage/>}/>
                            </Routes>
                        </MainContentContainer>
                    }/>
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}

export default App
