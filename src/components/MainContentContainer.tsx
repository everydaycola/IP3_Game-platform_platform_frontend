import {Box} from "@mui/material";
import {useMediaQueries} from "../hooks/useMediaQueries.tsx";

type AppLayoutProps = {
    children?: React.ReactNode;
};

export function MainContentContainer({children}: AppLayoutProps){
    const {isSmallScreen} = useMediaQueries();
    return (
        <>
            <Box
                sx={{
                    flex: 7,
                    borderTopLeftRadius:  isSmallScreen? 0 : 20,
                    p:2
                }}
            >
                {children}
            </Box>
        </>
    )
}