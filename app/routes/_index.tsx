import type { MetaFunction } from "@remix-run/node";
import Profile from "~/components/Profile";
import Sidebar from "~/components/Sidebar";


export const meta: MetaFunction = () => {
  return [
    { title: "Sat Narayan Sah" },
    { name: "description", content: "MERN Stack Developer" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="flex items-center justify-center h-screen gap-2">
        <div>
          <Sidebar />
        </div>
        <div>
          <Profile />
        </div>

      </div>
    </>
  );
}
