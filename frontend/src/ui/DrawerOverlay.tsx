import { ReactNode } from "react";

import Drawer, { type DrawerProps } from "@mui/material/Drawer";

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
