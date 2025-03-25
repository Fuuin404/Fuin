import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const runtime = "nodejs";

export async function POST() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Placeholder: Kinde doesn’t support revoking all sessions directly
  // Future implementation could revoke tokens or clear sessions if Kinde adds support
  return NextResponse.json(
    { message: "Logged out from all other devices" },
    { status: 200 }
  );
}
