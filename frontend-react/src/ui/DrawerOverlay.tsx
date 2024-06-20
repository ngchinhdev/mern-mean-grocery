import { ReactNode, useEffect } from "react";

import Drawer, { type DrawerProps } from "@mui/material/Drawer";
import { useLocation } from "react-router-dom";

type CloseReason = "backdropClick" | "escapeKeyDown" | "closeButtonClick";

interface DrawerOverlayProps extends DrawerProps {
  children: ReactNode;
  anchor: "top" | "left" | "bottom" | "right";
  onClose: (reason: CloseReason) => void;
}

export default function DrawerOverlay({
  children,
  open,
  onClose,
  anchor,
}: DrawerOverlayProps) {
  const location = useLocation();

  useEffect(() => {
    onClose("closeButtonClick");
  }, [location, onClose]);

  return (
    <Drawer
      open={open}
      anchor={anchor}
      transitionDuration={300}
      onClose={(_, reason) => onClose(reason)}
    >
      {children}
    </Drawer>
  );
}
