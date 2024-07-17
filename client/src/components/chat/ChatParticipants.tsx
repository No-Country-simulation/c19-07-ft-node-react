import { useState } from "react";

import { MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Menu,
  Avatar,
  AppBar,
  Toolbar,
  Tooltip,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";

interface ChatParticipantsProps {
  // participants: User[];
  onClearChat: () => void;
}

export const ChatParticipants = ({ onClearChat }: ChatParticipantsProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "white", borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
    >
      <Toolbar>
        <Box flexGrow="1">
          <Tooltip title="Juan">
            <Avatar alt="Juan" src="/static/images/avatar/2.jpg" />
          </Tooltip>
        </Box>

        {/* More options menu */}
        <Tooltip title="Options">
          <IconButton
            aria-label="chat options"
            aria-haspopup="true"
            onClick={(e) => setAnchorElNav(e.currentTarget)}
          >
            <MoreHoriz />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNav)}
          onClose={() => setAnchorElNav(null)}
        >
          <MenuItem
            onClick={() => {
              onClearChat();
              setAnchorElNav(null);
            }}
          >
            <Typography textAlign="center">Clear chat</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
