import  SignInPage  from "@/components/template/SignInPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function SignIn() {
  const session = await getServerSession(authOptions)
  if(session) redirect('/')

  return <SignInPage />;
}
export default SignIn