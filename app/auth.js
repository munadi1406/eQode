
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {  getServerSession } from "next-auth"
import jwt from 'jsonwebtoken'


const authOptions = {
   
    secret: process.env.NEXTAUTH_SECRET, 
    session: {
        strategy: "jwt",
      },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        
    ],
    callbacks: {
        async session({ session, token }) {
          const signingSecret = process.env.SUPABASE_JWT_SECRET
          if (signingSecret) {
            const payload = {
              aud: "authenticated",
              exp: Math.floor(new Date(session.expires).getTime() / 1000),
              sub: token.sub,
              email: token.email,
              role: "authenticated",
            }
            session.supabaseAccessToken = jwt.sign(payload, signingSecret)
            session.user.id = token.sub
          }
          return session
        },
      },

};
const getSession = () =>  getServerSession(authOptions)


export { authOptions, getSession }