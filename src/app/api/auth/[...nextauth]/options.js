import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";

export const options = {
    providers: [
        GithubProvider({
            profile(profile) {
                console.log("Profile Github: ", profile)

                let userRole = 'GitHub User'
                if (profile?.email == 'ealmonzer667@gmail.com') {
                    userRole = 'admin'
                }

                return {
                    ...profile,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: userRole
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile)

                let userRole = 'Google User'
                if (profile?.email == 'ealmonzer667@gmail.com') {
                    userRole = 'admin'
                }

                return {
                    ...profile,
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: userRole
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email:",
                    type: "email",
                    placeholder: "your-email",
                },
                password: {
                    label: "password:",
                    type: "password",
                    placeholder: "your-password",
                },
            },
            async authorize(credentials) {
                try {
                    const foundUser = await User.findOne({ email: credentials.email })
                        .lean()
                        .exec();

                    if (foundUser) {
                        console.log("User Exists");
                        const match = await bcrypt.compare(
                            credentials.password,
                            foundUser.password
                        );

                        if (match) {
                            console.log("Good Pass");
                            delete foundUser.password;

                            foundUser["role"] = "Unverified Email";
                            return foundUser;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },

        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session
        },
    },
}
