import { useState } from "react";
import {
    Box,
    SpeedDial,
    SpeedDialIcon,
    Paper,
    TextField,
    IconButton,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

export function ChatBox() {
    const [open, setOpen] = useState(false);

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                zIndex: 999
            }}
        >
            {open && (
                <Paper
                    elevation={6}
                    sx={{
                        position: "absolute",
                        bottom: 72,
                        right: 0,
                        width: 320,
                        height: 400,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 4
                    }}
                >
                    <Box
                        sx={{
                            p: 1.5,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            bgcolor: "primary.main",
                            color: "white",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Typography variant="subtitle1">
                            Chat Support
                        </Typography>
                        <IconButton size="small" onClick={() => setOpen(false)}>
                            <CloseIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            p: 2,
                            overflowY: "auto",
                            bgcolor: "#f5f5f5"
                        }}
                    >
                        <Typography variant="body2" color={"primary"}>
                            Hier zegt den ai IETSKEN nuttig.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 1,
                            display: "flex",
                            gap: 1,
                            borderTop: "1px solid #ddd"
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Type a message..."
                        />
                        <IconButton color="primary">
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            )}

            <SpeedDial
                ariaLabel="Chat"
                icon={<SpeedDialIcon />}
                onClick={() => setOpen(prev => !prev)}
                open={false}
                onMouseEnter={(e) => e.stopPropagation()}
                onMouseLeave={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                onBlur={(e) => e.stopPropagation()}
            />
        </Box>
    );
}
