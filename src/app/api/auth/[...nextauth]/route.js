import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../../utils/auth";
import connectDB from "../../../../utils/connectDB";
import User from "../../../../models/User";

//structure=> (logIn function)

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { pass, email } = credentials;

        //check connecting to DB
        try {
          await connectDB();
        } catch (error) {
          throw new Error("مشکلی در سرور رخ داده است");
        }

        //check email and password that is not empty
        if (!email || !pass) {
          throw new Error("لطفا اطلاعات معتبر وارد کنید!");
        }

        //finding user
        const user = await User.findOne({ email });

        //check user is exist براساس ایمیل کاربر وجود داشته باشد
        if (!user) {
          throw new Error("ایمیل یا رمز عبور اشتباه می باشد");
        }

        //check for user password with password in DB
        const isValid = await verifyPassword(pass, user.pass);

        if (!isValid) {
          throw new Error("ایمیل یا رمز عبور اشتباه می باشد");
        }
        //check user is enabled or no
        if (user.enabled === false) {
          throw new Error('حساب کاربری شما غیرفعال شده است لطفا با پشتیبانی تماس حاصل فرمایید.');
        }

        const name = [user.name, user.role];

        //if everything was ok
        return { email, name };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
