import {createTheme} from "@mui/material";
import {colors} from "./color.ts";

export const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                mode: "light",
                primary: {
                    main: colors.lightBlue,
                    contrastText:colors.white,
                },
                secondary:{
                    main:colors.lightOrange,
                    contrastText:colors.white,
                },
                background: {
                    default: colors.lightBlue,
                    paper: colors.white,
                }
            },
        },
        dark: {
            palette: {
                mode: "dark",
                primary: {
                    main: colors.darkBlue,
                    contrastText: colors.white,
                },
                secondary:{
                    main:colors.lightOrange,
                    contrastText:colors.white,
                },
                background: {
                    default: colors.lightBlue,
                    paper: colors.white,
                }
            },
        },
    },
    components:{
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                },
            },
        },
    }
})
