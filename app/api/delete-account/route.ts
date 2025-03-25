import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const runtime = "nodejs";

async function getManagementToken() {
  console.log("KINDE_ISSUER_URL:", process.env.KINDE_ISSUER_URL);
  console.log(
    "KINDE_MANAGEMENT_CLIENT_ID:",
    process.env.KINDE_MANAGEMENT_CLIENT_ID
  );
  console.log(
    "KINDE_MANAGEMENT_CLIENT_SECRET:",
    process.env.KINDE_MANAGEMENT_CLIENT_SECRET
  );

  if (!process.env.KINDE_ISSUER_URL) {
    throw new Error("KINDE_ISSUER_URL is not set in environment variables");
  }
  if (!process.env.KINDE_MANAGEMENT_CLIENT_ID) {
    throw new Error(
      "KINDE_MANAGEMENT_CLIENT_ID is not set in environment variables"
    );
  }
  if (!process.env.KINDE_MANAGEMENT_CLIENT_SECRET) {
    throw new Error(
      "KINDE_MANAGEMENT_CLIENT_SECRET is not set in environment variables"
    );
  }

  const response = await fetch(`${process.env.KINDE_ISSUER_URL}/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.KINDE_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.KINDE_MANAGEMENT_CLIENT_SECRET,
      audience: `${process.env.KINDE_ISSUER_URL}/api`,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch management token: ${errorText}`);
  }
  const { access_token } = await response.json();
  return access_token;
}

export async function DELETE(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const kindeUserId = user.id;
  console.log("Deleting user ID:", kindeUserId); // Log the user ID for debugging
  try {
    const apiToken = await getManagementToken();
    const response = await fetch(
      `${process.env.KINDE_ISSUER_URL}/api/v1/user?id=${kindeUserId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Kinde API error: ${errorText}`);
    }

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
