import { useMedia } from "react-use";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({ children, open, onOpenChange }: ResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width: 768px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle className="sr-only">Create workspace</DialogTitle>
        <DialogDescription className="sr-only">Create a new workspace</DialogDescription>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="overflow-y-auto hide-scrollbar max-h-[85vh]">
        {children}
      </DrawerContent>
    </Drawer>
  );
};
