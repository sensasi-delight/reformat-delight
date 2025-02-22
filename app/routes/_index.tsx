import { redirect } from "@remix-run/node";

export default function Index() {}

export const loader = async () => {
  return redirect("/csv-to-xlsx");
};
