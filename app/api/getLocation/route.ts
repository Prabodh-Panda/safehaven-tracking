import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const trackingId = url.searchParams.get("tracking_id");

  if (!trackingId) {
    return NextResponse.json(
      { error: "Tracking ID is required" },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  try {
    const { data, error } = await supabase
      .from("users")
      .select("last_latitude, last_longitude, location_updated")
      .eq("tracking_id", trackingId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return NextResponse.json(
        { error: "No location found for the given tracking ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      last_latitude: data.last_latitude,
      last_longitude: data.last_longitude,
      location_updated: data.location_updated,
    });
  } catch (err) {
    let error = err as any;
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
