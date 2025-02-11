import { FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import bcrypt from 'bcrypt';

export async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    signIn("credentials", {
    ...data,
    callbackUrl: "/dashboard",   
    })
  }
