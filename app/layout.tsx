import type { Metadata, Viewport } from "next";
import type React from "react";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], style: ["italic"], axes: ["SOFT", "opsz"], variable: "--font-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const description =
  "Ranim Abker — Full-Stack Software Engineer from ENICarthage. Secure, observable microservice platforms with Spring Boot, Quarkus, React, Keycloak and OpenTelemetry, plus applied AI. Follow the trace.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ranim-alpha.vercel.app"),
  title: "Ranim Abker · Full-Stack Software Engineer",
  description,
  openGraph: {
    type: "website",
    title: "Ranim Abker · Full-Stack Software Engineer",
    description: profile.tagline,
    images: ["/media/portrait.webp"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1a1928",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.role,
  hasCredential: { "@type": "EducationalOccupationalCredential", name: "Engineering Degree in Computer Engineering — Very Good Honors", recognizedBy: { "@type": "CollegeOrUniversity", name: "ENICarthage" } },
  email: `mailto:${profile.email}`,
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "National Engineering School of Carthage (ENICarthage)" },
    { "@type": "CollegeOrUniversity", name: "Preparatory Institute for Engineering Studies of Nabeul (IPEIN)" },
  ],
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: ["Microservices", "Spring Boot", "Quarkus", "React", "Keycloak", "OpenTelemetry", "Deep learning"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`is-loading ${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{`.loader{display:none!important}html.is-loading{overflow:auto!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
