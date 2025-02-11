'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { FormEvent, useState } from "react"
import { handleSubmit } from "@/app/login/utils/handleSubmit"
import { useSearchParams } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {


  const [selectedMethod, setSelectedMethod] = useState<'email' | 'cpf' | 'cnpj'>('cpf');
  const handleButtonClick = (method: 'email' | 'cpf' | 'cnpj') => { setSelectedMethod(method); }

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => { setShowPassword(!showPassword) };

  const searchParams: URLSearchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <Image src={"/images/logo-preto-laranja.png"} alt="logo" width={150} height={150} className="self-center" />
        </CardHeader>
        <CardContent>
          <div className="border-2 border-primary w-auto grid grid-cols-3 rounded-xl my-4 overflow-hidden mx-auto text-lg">
            <button id="buttonEmail" onClick={() => handleButtonClick('email')} className={cn("p-1", { 'bg-primary text-white': selectedMethod === 'email' })}>Email</button>
            <button id="buttonCPF" onClick={() => handleButtonClick('cpf')} className={cn("p-1", { 'bg-primary text-white': selectedMethod === 'cpf' })}>CPF</button>
            <button id="buttonCNPJ" onClick={() => handleButtonClick('cnpj')} className={cn("p-1", { 'bg-primary text-white': selectedMethod === 'cnpj' })}>CNPJ</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {selectedMethod === 'email' && (
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-lg">Email</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
              )}
              {selectedMethod === 'cpf' && (
                <div className="grid gap-2">
                  <Label htmlFor="cpf" className="text-lg">CPF</Label>
                  <Input
                    name="cpf"
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
              )}
              {selectedMethod === 'cnpj' && (
                <div className="grid gap-2">
                  <Label htmlFor="cpf" className="text-lg">CNPJ</Label>
                  <Input
                    name="cpf"
                    id="cpf"
                    type="text"
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-lg">Senha</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
                <div className="inline-flex items-center shadow-sm border border-neutral-200 rounded-md pr-3">
                  <Input
                    id="password"
                    name="password"
                    type={cn({ "password": showPassword })}
                    required
                    autoComplete="off"
                    className="border-none shadow-none focus-visible:ring-0" />
                  <Visibility onClick={handleShowPassword} className={cn("cursor-pointer", { "hidden": showPassword })} />
                  <VisibilityOff onClick={handleShowPassword} className={cn("cursor-pointer", { "hidden": !showPassword })} />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary text-lg">
                Entrar
              </Button>
              <a href="/primeiro-acesso" className="w-full text-center text-md underline-offset-4 hover:underline">
                Primeiro acesso?
              </a>
              {error === "CredentialsSignin" && (
                <CardDescription className="text-white text-center text-lg font-medium bg-red-500 rounded-md p-3">
                  Dados inválidos
                </CardDescription>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div >
  )
}
