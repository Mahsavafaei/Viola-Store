import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardUsersPage from "@/components/template/dashboard/users/DashboardUsersPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function DashboardUsers() {
    const session = await getServerSession(authOptions)
    console.log(session)
    const role = session.user.name[1]
    if(role !== 'ADMIN') redirect('/dashboard')
  return (<DashboardUsersPage/> );
}
