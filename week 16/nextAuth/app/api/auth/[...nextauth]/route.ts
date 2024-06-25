import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", placeholder: "username", type: "text" },
        password: { label: "Password", placeholder: "**********", type: "password" }
      },
      async authorize(credentials: any) {
        // console.log(credentials)
        return {
          id: "1",
          credentials: credentials?.username
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log({token: token, account: account, profile: profile})
      return token
    }
  }
})

export { handler as GET, handler as POST }