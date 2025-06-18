import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from '@models/user';
import { connectToDB } from "@utils/database";

//Remove this
// console.log({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// })

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                //serverLess -> Lambda function
                await connectToDB();
                // Check if user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });

                //if not Found, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;

            }
            catch (error) {
                // Return false to indicate sign-in failure
                console.log(error);
                return false;
            }
        }
    },

})

export { handler as GET, handler as POST }