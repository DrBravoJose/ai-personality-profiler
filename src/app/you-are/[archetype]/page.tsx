import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARCHETYPES, SLUG_TO_ARCHETYPE, CODE_TO_IMAGE } from "@/lib/archetypes";

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ archetype: string }> }
): Promise<Metadata> {
  const { archetype } = await params;
  const a = SLUG_TO_ARCHETYPE[archetype];
  if (!a) return { title: "Not Found" };

  const imageFile = CODE_TO_IMAGE[a.code.toLowerCase()] || a.code.toLowerCase();
  const ogImage = `/images/avatar_${imageFile}.png`;

  return {
    title: `${a.title} (${a.code}) — AI Personality Type | AI Profiler`,
    description: `${a.tagline} ${a.intro.slice(0, 140)}`,
    openGraph: {
      title: `${a.title} (${a.code}) — AI Personality`,
      description: a.catchphrase,
      images: [{ url: ogImage, width: 1200, height: 1200, alt: `${a.title} AI personality archetype` }],
      type: "website",
      siteName: "AI Profiler",
    },
    twitter: {
      card: "summary_large_image",
      title: `${a.title} (${a.code}) — AI Personality`,
      description: a.catchphrase,
      images: [ogImage],
    },
  };
}

export function generateStaticParams() {
  return ARCHETYPES.map(a => ({ archetype: a.slug }));
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ArchetypePage(
  { params }: { params: Promise<{ archetype: string }> }
) {
  const { archetype } = await params;
  const a = SLUG_TO_ARCHETYPE[archetype];
  if (!a) notFound();

  const imageFile = CODE_TO_IMAGE[a.code.toLowerCase()] || a.code.toLowerCase();

  return (
    <div style={{ minHeight: "100dvh", background: "#f7fafc" }}>
      {/* Nav */}
      <nav style={{
        padding: "12px 16px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" style={{ fontSize: 15, fontWeight: 700, color: "#2d3748", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#f0f4f8", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>❖</span>
          AI Profiler
        </Link>
        <Link href="/" style={{ fontSize: 13, color: "#fff", background: a.color, padding: "6px 16px", borderRadius: 20, textDecoration: "none", fontWeight: 600 }}>
          Test an AI →
        </Link>
      </nav>

      <main style={{ maxWidth: 600, margin: "0 auto", padding: "32px 16px 80px" }}>

        {/* Code badge */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{
            display: "inline-block", padding: "4px 20px", borderRadius: 999, fontSize: 12,
            fontWeight: 700, letterSpacing: 4, color: "#fff", background: a.color,
          }}>{a.code}</span>
        </div>

        {/* Title */}
        <h1 style={{ textAlign: "center", fontSize: "2rem", color: a.color, marginBottom: 8, lineHeight: 1.2 }}>
          {a.title}
        </h1>
        <p style={{ textAlign: "center", fontStyle: "italic", color: "#718096", fontSize: "1rem", marginBottom: 28, lineHeight: 1.6 }}>
          {a.tagline}
        </p>

        {/* Avatar */}
        <div style={{
          position: "relative", width: "100%", maxWidth: 280, margin: "0 auto 32px",
          aspectRatio: "1", borderRadius: 24, overflow: "hidden",
          background: `radial-gradient(circle, ${a.color}22 0%, transparent 70%)`,
        }}>
          <img
            src={`/images/avatar_${imageFile}.png`}
            alt={a.title}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        {/* Catchphrase */}
        <div style={{
          textAlign: "center", fontSize: "1.25rem", fontWeight: 700, color: "#2d3748",
          lineHeight: 1.5, marginBottom: 28, padding: "0 8px",
        }}>
          "{a.catchphrase}"
        </div>

        {/* Intro */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "20px 24px",
          border: "1px solid #e2e8f0", marginBottom: 20,
        }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#2d3748", marginBottom: 10 }}>About this archetype</h2>
          <p style={{ fontSize: "0.9375rem", color: "#4a5568", lineHeight: 1.8, margin: 0 }}>{a.intro}</p>
        </div>

        {/* Model match */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "20px 24px",
          border: `1px solid ${a.color}44`, marginBottom: 20,
        }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: a.color, marginBottom: 12 }}>
            🤖 AIs with this personality
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {a.models.map(m => (
              <span key={m} style={{
                background: `${a.color}18`, color: a.color,
                padding: "6px 16px", borderRadius: 999, fontSize: "0.875rem", fontWeight: 600,
                border: `1px solid ${a.color}33`,
              }}>{m}</span>
            ))}
          </div>
          <p style={{ fontSize: "0.8125rem", color: "#a0aec0", marginTop: 12, marginBottom: 0 }}>
            * Based on archetype characteristics. Run the full model benchmark to see exact scores.
          </p>
        </div>

        {/* Affiliate recommendation */}
        {a.affiliate && (
          <div style={{
            background: "#fff", borderRadius: 16, padding: "20px 24px",
            border: `2px solid ${a.color}`, marginBottom: 28,
          }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#2d3748", marginBottom: 12 }}>
              ✨ Recommended for {a.title} types
            </h2>
            <a
              href={a.affiliate.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 14,
                textDecoration: "none",
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${a.color}18`, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 24,
              }}>
                🤖
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: a.color, marginBottom: 2 }}>
                  {a.affiliate.name}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "#4a5568", lineHeight: 1.5 }}>
                  {a.affiliate.note}
                </div>
              </div>
              <div style={{
                background: a.color, color: "#fff",
                padding: "10px 20px", borderRadius: 10,
                fontSize: "0.875rem", fontWeight: 700,
              }}>
                Try it →
              </div>
            </a>
          </div>
        )}

        {/* CTA */}
        <div style={{
          background: `linear-gradient(135deg, ${a.color}18 0%, ${a.color}08 100%)`,
          border: `1px solid ${a.color}44`, borderRadius: 20, padding: "28px 24px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "1.0625rem", color: "#2d3748", fontWeight: 600, marginBottom: 6 }}>
            Want to test your own AI?
          </p>
          <p style={{ fontSize: "0.875rem", color: "#718096", marginBottom: 20 }}>
            Give the 60-question MBTI test to any AI and discover its true personality archetype.
          </p>
          <Link href="/" style={{
            display: "inline-block", background: a.color, color: "#fff",
            padding: "14px 36px", borderRadius: 12, fontSize: "1rem", fontWeight: 700,
            textDecoration: "none", boxShadow: `0 4px 20px ${a.color}44`,
          }}>
            🧪 Test an AI →
          </Link>
        </div>

        {/* Browse all */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: 16 }}>Explore all 16 AI archetypes</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {ARCHETYPES.map(arc => (
              <Link
                key={arc.slug}
                href={`/you-are/${arc.slug}`}
                style={{
                  padding: "6px 14px", borderRadius: 8, fontSize: "0.8125rem", fontWeight: 600,
                  textDecoration: "none",
                  background: arc.slug === archetype ? arc.color : "#edf2f7",
                  color: arc.slug === archetype ? "#fff" : "#4a5568",
                  border: "none",
                }}
              >
                {arc.code}
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}