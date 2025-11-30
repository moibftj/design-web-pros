import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("examples").select("*").limit(10);
      if (error) setError(error.message);
      else setRows(data ?? []);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Supabase + Next.js + Tailwind + NextAuth</h1>
      <p className="mb-2">This page fetches from a sample table: <code>examples</code>.</p>
      {error && <p className="text-red-600">Error: {error}</p>}
      <ul className="list-disc pl-6">
        {rows.map((r) => (
          <li key={r.id}>
            <span className="font-semibold">{r.title}</span> — {r.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}
