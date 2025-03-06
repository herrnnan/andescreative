"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // Simular envío del formulario
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      })
      // Resetear el formulario
      event.currentTarget.reset()
    }, 1000)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Input placeholder="Nombre" required disabled={isLoading} />
      </div>
      <div>
        <Input type="email" placeholder="Email" required disabled={isLoading} />
      </div>
      <div>
        <Textarea placeholder="Mensaje" required disabled={isLoading} className="min-h-[120px]" />
      </div>
      <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  )
}

