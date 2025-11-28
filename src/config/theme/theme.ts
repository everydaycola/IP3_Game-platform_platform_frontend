import {createTheme} from "@mui/material";
import {colors} from "./color.ts";

export const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                mode: "light",
                primary: {
                    main: colors.lightBlue,
                    dark:colors.darkBlue,
                    contrastText: colors.white,
                },
                secondary: {
                    main: colors.lightOrange,
                    contrastText: colors.white,
                },
                background: {
                    default: colors.lightBlue,
                    paper: colors.white,
                    paperChannel: colors.white
                },
                info:{
                    main: colors.emerald,
                },
                text: {
                    primary: colors.black,
                    secondary: colors.lightBlue
                }
            },
        },
        dark: {
            palette: {
                mode: "dark",
                primary: {
                    main: colors.lightBlue,
                    dark:colors.darkBlue,
                    contrastText: colors.white,
                },
                secondary: {
                    main: colors.lightOrange,
                    contrastText: colors.white,
                },
                background: {
                    default: colors.lightBlue,
                    paper: colors.white,
                },
                info:{
                    main: colors.emerald,
                },
                text: {
                    primary: colors.white,
                    secondary: colors.darkBlue,
                }
            },
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                },
            },
        },
    }
})
