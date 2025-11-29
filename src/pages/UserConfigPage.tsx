import {Typography, Stack, Avatar, Checkbox, Button} from "@mui/material";
import {ThemeControls} from "../components/ThemeControls.tsx";

export function UserConfigPage() {
    return (
        <>
            <Stack direction="row" justifyContent="flex-end">
                <Button sx={{ width: "25%" }} variant="contained" color="secondary">
                    Uitloggen
                </Button>
            </Stack>

            <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                sx={{
                    mt:2,
                    minHeight: "50%"
                }}
            >
                <Stack
                    direction={"column"}
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Avatar
                        alt="Placeholder"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99-ZMZeEtYlFVdT-HN3Hz0f_i64Zf76D67g&s"
                        sx={{width: 150, height: 150}}
                    />
                    <Typography
                        variant={"h4"}
                        sx={{mt: 2}}
                    >
                        USERNAME
                    </Typography>
                </Stack>
                <Stack direction={"column"}
                       sx={{
                           flex: 1,
                           p: 2
                       }}
                >
                    <Typography
                        variant={"h4"}
                        sx={{
                            width: "100%"
                        }}
                    >
                        Uw voorkeuren beheren
                    </Typography>
                    <Stack direction={"row"}
                           sx={{
                               display: "flex",
                               alignItems: "center",
                               justifyContent: "space-between",
                               mt:2
                           }}>
                        <Typography sx={{mr: 2}}>Thema:</Typography>
                        <ThemeControls/>
                    </Stack>
                    <Typography
                        variant={"h6"}
                        fontWeight={"bold"}
                        sx={{mt: 2}}
                    >
                        Notificaties
                    </Typography>
                    <Stack direction={"row"}
                           alignItems={"center"}>
                        Meldingen binnen het platform ontvangen?
                        <Checkbox/>
                    </Stack>
                    <Stack direction={"row"}
                           alignItems={"center"}>
                        Meldingen via e-mail ontvangen?
                        <Checkbox/>
                    </Stack>
                </Stack>

            </Stack>
        </>
    )
}