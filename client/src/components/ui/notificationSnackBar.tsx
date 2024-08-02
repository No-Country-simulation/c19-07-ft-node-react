import { useState } from "react";

import {
  Menu,
  Badge,
  Tooltip,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";

export const NotificationComponent = () => {
  // Estado para el número de notificaciones y las notificaciones en sí
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New email received" },
    { id: 2, message: "Meeting scheduled at 3 PM" },
    { id: 3, message: "Update available for your application" },
    { id: 4, message: "Update available for your application" },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Abre el menú de notificaciones
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setNotifications([]);
  };

  // Cierra el menú de notificaciones
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Calcula el número de notificaciones
  const notificationCount = notifications.length;

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={handleClick} aria-label="notifications">
          <Badge badgeContent={notificationCount} color="info">
            <Notifications />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.length === 0 ? (
          <MenuItem>
            <Typography>No notifications</Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem key={notification.id}>
              <Typography>{notification.message}</Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};
