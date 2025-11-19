import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {WelcomeComponent} from "./components/WelcomeComponent.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme/theme.ts";

function App() {

  return (
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<WelcomeComponent/>} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </>
  )
}

export default App
