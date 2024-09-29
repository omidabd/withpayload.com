import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "withPayload.com - explore payload plugins and starters",
  description: "explore payload plugins and starters",
};

const Homepage = async () => {
  redirect("/projects");
};

export default Homepage;
