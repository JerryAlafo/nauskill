"use client"

import * as React from "react"
import { Construction } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

function ComingSoonModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <div className="flex flex-col items-center text-center space-y-3 py-2">
          <Construction className="h-10 w-10 text-primary" />
          <DialogTitle>Funcionalidade indisponível</DialogTitle>
          <DialogDescription>
            Esta funcionalidade ainda não está disponível nesta versão da plataforma. Será lançada em breve.
          </DialogDescription>
          <Button className="w-full mt-1" onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hook para botões personalizados (câmara, ícones, etc.)
export function useComingSoon() {
  const [open, setOpen] = React.useState(false)
  return {
    trigger: () => setOpen(true),
    modal: <ComingSoonModal open={open} onClose={() => setOpen(false)} />,
  }
}

// Substituição directa de <Button> sem acção
export function ComingSoonButton({ children, ...props }: Omit<ButtonProps, "onClick">) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button {...props} onClick={() => setOpen(true)}>
        {children}
      </Button>
      <ComingSoonModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
