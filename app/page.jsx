'use client'

import { useSession, signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";


export default function Home() {
  const {  status } = useSession();
  
 
  
  
  useEffect(()=>{
  
    if (status === "authenticated") {
      redirect('/dashboard')
    }
  },[status])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">eqoDe Login</h2>
        <div className="flex justify-center items-center flex-wrap">
        <GithubLoginButton text="Sign In With Github" onClick={()=>signIn('github')}/>
        <GoogleLoginButton text="Sign In With Google" onClick={()=>signIn('google')}/>
        </div>
      </div>
    </main>
  );
}

