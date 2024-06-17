import { ReactNode } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface DialogPopup {
  widthSet: string;
  isConfirmation: boolean;
  isOpen: boolean;
  children: ReactNode;
  setIsConfirm?: (isConfirm: boolean) => void;
  callback: () => unknown;
  onClose: () => void;
}

export default function DialogPopup({
  isConfirmation,
  widthSet,
  isOpen,
  onClose,
  children,
}: DialogPopup) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDisagree = () => {
    onClose();
  };

  const handleAgree = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              padding: "1.5rem",
              paddingRight: "1.5rem",
              maxWidth: widthSet,
              borderRadius: "20px",
            },
          },
        }}
      >
        <DialogContent
          sx={{
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {children}
        </DialogContent>
        {isConfirmation && (
          <DialogActions>
            <Button autoFocus onClick={handleDisagree}>
              Disagree
            </Button>
            <Button onClick={handleAgree} autoFocus>
              Agree
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
