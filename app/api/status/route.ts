import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { APPS } from "@/lib/apps";

export const revalidate = 3600;

const s3 = new S3Client({
  region: process.env.S4_REGION ?? "us-east-1",
  endpoint: process.env.S4_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S4_ACCESS_KEY!,
    secretAccessKey: process.env.S4_SECRET_KEY!,
  },
  forcePathStyle: true,
});

const BUCKET = process.env.S4_BUCKET ?? "mvp-machine-content";

export type AppStatus = {
  id: string;
  lastUpdated: string | null;
};

export async function GET() {
  const results = await Promise.allSettled(
    APPS.map(async (app): Promise<AppStatus> => {
      const list = await s3.send(
        new ListObjectsV2Command({ Bucket: BUCKET, Prefix: app.s4Prefix })
      );
      const latest = (list.Contents ?? [])
        .map((o) => o.LastModified)
        .filter(Boolean)
        .sort((a, b) => b!.getTime() - a!.getTime())[0];
      return {
        id: app.id,
        lastUpdated: latest ? latest.toISOString() : null,
      };
    })
  );

  const statuses: AppStatus[] = results.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : { id: APPS[i].id, lastUpdated: null }
  );

  return NextResponse.json(statuses);
}
