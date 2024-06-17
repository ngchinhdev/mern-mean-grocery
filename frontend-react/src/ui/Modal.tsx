import { useEffect } from "react";
import { createPortal } from "react-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { useLocation } from "react-router-dom";

import useOutsideClick from "src/hooks/useOutsideClick";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  const location = useLocation();

  // useEffect(() => {
  //   onClose();
  // }, [location, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  });

  const ref = useOutsideClick(onClose);

  return (
    isOpen &&
    createPortal(
      <div
        className={`fixed left-0 top-0 z-50 h-full w-full overflow-y-scroll bg-neutral-950 bg-opacity-60`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div
            ref={ref}
            className={`relative rounded-2xl bg-white p-10 transition-all`}
          >
            {children}
          </div>
        </div>
        <button
          className="absolute right-5 top-5 flex items-center justify-center rounded-full bg-white p-2"
          onClick={onClose}
        >
          <LiaTimesSolid className="text-xl text-gray-700" />
        </button>
      </div>,
      document.getElementById("body") as HTMLElement,
    )
  );
}
