import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";

const SignInPage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/");

  return <div>Sign Out Page</div>;
};

export default SignInPage;
