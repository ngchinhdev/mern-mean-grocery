import { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { LiaTimesSolid } from "react-icons/lia";

interface DialogPopup {
  widthSet: string;
  isConfirmation: boolean;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export default function DialogPopup({
  widthSet,
  isOpen,
  onClose,
  children,
}: DialogPopup) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
              maxWidth: widthSet,
              borderRadius: "20px",
              height: "auto",
            },
          },
        }}
        className=""
      >
        <button
          className="absolute right-5 top-5 flex items-center justify-center rounded-full bg-white p-2"
          onClick={onClose}
        >
          <LiaTimesSolid className="text-xl text-gray-700" />
        </button>
        <DialogContent
          sx={{
            "&::-webkit-scrollbar": { display: "none" },
            "&": { padding: 0 },
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
