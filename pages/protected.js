import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { supabase } from "@/lib/supabaseClient";

export default function Protected({ email, count }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Protected page</h2>
      <p className="mb-2">You are signed in as: {email}</p>
      <p className="mb-2">Count of rows in "examples": {count}</p>
      <p className="text-sm text-gray-600">This page uses server-side session verification.</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: { destination: "/api/auth/signin", permanent: false }
    };
  }

  const { count } = await supabase
    .from("examples")
    .select("*", { count: "exact", head: true });

  return { props: { email: session.user.email, count: count ?? 0 } };
}
