import { ImageResponse } from "next/og";
import { ARCHETYPES, CODE_TO_IMAGE } from "@/lib/archetypes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ archetype: string }>;
}) {
  const { archetype } = await params;
  const a = ARCHETYPES.find((arc) => arc.slug === archetype);

  if (!a) {
    return new ImageResponse(
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        AI Personality Profiler
      </div>,
      { ...size }
    );
  }

  const imageFile = CODE_TO_IMAGE[a.code.toLowerCase()];
  const avatarUrl = new URL(`/images/avatar_${imageFile}.png`, "https://ai-personality-test.vercel.app").href;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left: Avatar */}
        <div
          style={{
            width: 540,
            height: 630,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 480,
              height: 480,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${a.color}33 0%, transparent 70%)`,
            }}
          />
          <img
            src={avatarUrl}
            width={420}
            height={420}
            style={{ borderRadius: 40, position: "relative", zIndex: 1 }}
            alt={a.title}
          />
        </div>

        {/* Right: Info */}
        <div
          style={{
            flex: 1,
            padding: "64px 56px 64px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Code badge + MBTI label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                padding: "6px 20px",
                borderRadius: 999,
                background: a.color,
                color: "#fff",
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 6,
              }}
            >
              {a.code}
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                background: `${a.color}22`,
                border: `1px solid ${a.color}55`,
                color: a.color,
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              MBTI for AIs
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: a.color,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {a.title}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              color: "#94a3b8",
              fontStyle: "italic",
              lineHeight: 1.4,
              marginBottom: 32,
            }}
          >
            {a.tagline}
          </div>

          {/* Models */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 20, color: "#64748b", fontWeight: 600 }}>
              Similar AIs
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {a.models.map((m) => (
                <div
                  key={m}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 12,
                    background: `${a.color}18`,
                    border: `1px solid ${a.color}44`,
                    color: a.color,
                    fontSize: 22,
                    fontWeight: 700,
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom accent bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 540,
              right: 0,
              height: 6,
              background: `linear-gradient(90deg, ${a.color}, ${a.color}88, transparent)`,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
