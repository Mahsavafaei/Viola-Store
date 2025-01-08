import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardAddUserPage from "@/components/template/dashboard/users/DashboardAddUserPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";


export default async function DashboardUser() {

   const session = await getServerSession(authOptions)
    const role = session.user.name[1]
    if(role !== 'ADMIN') redirect('/dashboard')
  return (<DashboardAddUserPage/> );
}
