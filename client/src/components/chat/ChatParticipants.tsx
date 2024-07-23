import { useState } from "react";

import { ArrowBack, MoreHoriz } from "@mui/icons-material";
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
import { useNavigate } from "react-router-dom";

interface ChatParticipantsProps {
  // participants: User[];
  onClearChat: () => void;
}

export const ChatParticipants = ({ onClearChat }: ChatParticipantsProps) => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "white", borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1} flexGrow="1">
          <Tooltip title="Juan">
            <Avatar alt="Juan" src="/static/images/avatar/2.jpg" />
          </Tooltip>

          <Typography variant="h6" color="primary">
            Juan
          </Typography>
        </Box>

        <Tooltip title="Back to contacts">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        </Tooltip>

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
