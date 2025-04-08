import MainDashboardPage from "@/components/template/dashboard/MainDashboardPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function Dashboard() {

  const session = await getServerSession(authOptions)
  const userName = session.user.name[0];
  const role = session.user.name[1];
  
  return (<MainDashboardPage userName={userName} role={role} /> );
}
