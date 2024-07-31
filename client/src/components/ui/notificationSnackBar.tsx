import React, { useState } from 'react';
import { Badge, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const NotificationComponent = () => {
  // Estado para el número de notificaciones y las notificaciones en sí
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New email received' },
    { id: 2, message: 'Meeting scheduled at 3 PM' },
    { id: 3, message: 'Update available for your application'},
    {id: 4, message: 'Update available for your application'}
  ]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Abre el menú de notificaciones
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Cierra el menú de notificaciones
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Calcula el número de notificaciones
  const notificationCount = notifications.length;

  return (
    <>
      <IconButton onClick={handleClick}  aria-label='notifications'>
        <Badge badgeContent={notificationCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
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