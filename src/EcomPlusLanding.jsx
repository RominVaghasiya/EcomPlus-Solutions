// src/EcomPlusLanding.jsx
import React, { useEffect, useState } from "react";

export default function EcomPlusLanding() {
  const rotating = ["Profits", "Business", "Customers"];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % rotating.length);
        setVisible(true);
      }, 260);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // helper to smoothly scroll to an element id (and close mobile menu if open)
  function goToId(id) {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      // use scrollIntoView with smooth behavior
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback: change location hash
      window.location.hash = `#${id}`;
    }
  }

  return (
    <div
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
        color: "#0f172a",
      }}
    >
      <style>{`
        :root { --bg:#ffffff; --header-h:72px; }

        /* ===========================
           HEADER
           =========================== */
        .eps-header {
          position: sticky; top: 0; z-index: 90;
          background: var(--bg);
          border-bottom: 1px solid rgba(15,23,42,0.04);
          backdrop-filter: blur(2px);
        }
        .eps-container {
          max-width: 1200px; margin: 0 auto;
          padding: 12px 18px; display:flex;
          align-items:center; justify-content:space-between; gap:14px;
        }
        .eps-left { display:flex; align-items:center; gap:14px; text-decoration:none; }
        .eps-logo { width:96px; height:96px; object-fit:cover; border-radius:12px; box-shadow:0 10px 30px rgba(79,70,229,0.06); }
        .company-name { display:flex; flex-direction:column; line-height:1; }
        .company-title { font-size:20px; font-weight:800; color:#0f172a; }
        .company-sub { font-size:12px; color:#6b7280; margin-top:2px; }

        .eps-nav { display:none; gap:22px; align-items:center; }
        .eps-nav a { color:#0b1220; text-decoration:none; font-size:15px; font-weight:600; padding:6px 0; cursor:pointer; }
        .nav-contact { color:#0b1220; font-weight:800; }

        .header-actions { display:flex; gap:10px; align-items:center; }
        .contact-btn {
          padding:10px 14px; border-radius:10px; background: linear-gradient(90deg,#6366f1,#7c3aed);
          color:white; font-weight:600; text-decoration:none; box-shadow:0 8px 30px rgba(99,102,241,0.12);
          font-size:14px;
        }

        .hamburger {
          display:inline-flex; align-items:center; justify-content:center;
          width:44px; height:44px; border-radius:8px; background:#f3f4f6;
          border:1px solid rgba(15,23,42,0.04);
        }

        .mobile-panel { display: none; }
        .mobile-panel.open {
          display: block;
          position: absolute;
          left: 0; right: 0; top: 64px;
          background: white;
          border-top: 1px solid rgba(15,23,42,0.04);
          box-shadow: 0 12px 36px rgba(2,6,23,0.08);
          z-index: 88;
          animation: slideDown 220ms ease;
        }
        @keyframes slideDown {
          from { transform: translateY(-6px); opacity:0; }
          to { transform: translateY(0); opacity:1; }
        }
        .mobile-links { display:flex; flex-direction:column; gap:6px; padding: 12px 16px; max-width:1200px; margin: 0 auto; }
        .mobile-links a { text-decoration:none; color:#0b1220; font-weight:700; padding:10px 8px; border-radius:8px; display:block; cursor:pointer; }

        /* ===========================
           HERO (tight, no extra whitespace)
           =========================== */
        .hero {
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 14px 6px;
  position: relative;
  overflow: visible;
  background: linear-gradient(145deg, #fbfbff 0%, #f4f1ff 40%, #ece9ff 100%);
  /* new line below ensures header doesn't hide top when scrolling to #top */
  scroll-margin-top: calc(var(--header-h) + 20px);
}
        .hero-bg { position:absolute; inset:0; z-index:0;
          background:
            radial-gradient(700px 300px at 8% 18%, rgba(124,58,237,0.08), transparent 20%),
            radial-gradient(600px 240px at 92% 78%, rgba(99,102,241,0.08), transparent 25%),
            linear-gradient(180deg,#ffffff 0%, #fbfbff 50%, #f6f3ff 100%);
          pointer-events: none;
        }
        .blob-a, .blob-b { position:absolute; filter: blur(72px); z-index:0; }
        .blob-a { left:-10%; top:64%; width:480px; height:480px; background: radial-gradient(circle at 30% 30%, rgba(147,51,234,0.12), rgba(147,51,234,0.04)); }
        .blob-b { right:-10%; top:18%; width:420px; height:420px; background: radial-gradient(circle at 40% 40%, rgba(99,102,241,0.10), rgba(99,102,241,0.02)); }

        .hero-inner { position:relative; z-index:2; width:100%; max-width:1200px; display:grid; grid-template-columns:1fr; gap:20px; align-items:center; }
        @media(min-width:900px) { .hero-inner { grid-template-columns: 1fr 560px; gap:28px; } }

        .hero-left { padding: 6px 6px 0 6px; }
        .hero-h1 { margin:0 0 8px; color:#0b1720; line-height:1.02; }
        .smallIntro { display:block; font-weight:700; font-size:16px; color:#111827; margin-bottom:6px; }
        .big { display:block; font-size: clamp(30px, 6.4vw, 56px); font-weight:900; letter-spacing:-1px; color:#0b1220; }

        .hero-row { display:flex; align-items:center; gap:12px; margin-top:12px; }
        .hero-in { font-size: clamp(22px, 4.8vw, 44px); font-weight:800; color:#111827; }
        .highlight {
          display:inline-block; padding:6px 12px; border-radius:10px; background:linear-gradient(90deg,#f3e8ff,#eef6ff);
          color:#6b21a8; font-weight:900; min-width:140px; text-align:center; transition:opacity 260ms, transform 260ms;
          font-size: clamp(26px, 5.8vw, 48px);
        }
        .highlight.hidden { opacity:0; transform: translateY(6px); }

        .hero-right { display:flex; align-items:center; justify-content:center; margin-bottom:0; }
        .hero-gif {
          width:100%; max-width:560px; height:auto; border-radius:12px; box-shadow:0 24px 80px rgba(15,23,42,0.08); object-fit:cover; display:block; margin: 0;
        }
        .hero-gif { vertical-align: middle; }

        /* ===========================
           EXPERTISE (centered & close to hero)
           =========================== */
        .expertise-section {
          background:#1d4ed8;
          border-radius:26px;
          max-width:1200px;
          margin: 8px auto 12px;
          padding: 26px 16px;
          text-align:center;
          color:white;
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        }
        .expertise-title { font-size: clamp(22px, 3.4vw, 28px); font-weight:800; margin:0; align-self:center; }
        .expertise-img { width:582px; height:594px; object-fit:contain; border-radius:12px; display:block; margin: 0 auto; }

        /* ===========================
           SERVICES (small top gap)
           =========================== */
        .services-wrap { max-width: 1200px; margin: 10px auto 60px; padding: 0 20px; }
        .services-card {
          border-radius: 18px; padding: 24px;
          background: linear-gradient(180deg, rgba(255,244,246,0.95), rgba(255,240,243,0.98));
          box-shadow: 0 18px 40px rgba(15,23,42,0.04);
          margin: 0 auto; max-width: 980px;
        }
        .services-list { display: grid; gap: 16px; }
        .service-item { display: grid; grid-template-columns: 56px 1fr; gap: 12px; align-items: start; padding: 6px 8px; }
        .service-number { font-size: 42px; color: rgba(15,23,42,0.06); font-weight: 900; line-height: 1; display:flex; align-items:flex-start; justify-content:flex-start; padding-top: 6px; }
        .service-content h3 { margin: 0; font-size: 16px; font-weight: 800; color: #0f172a; }
        .service-content p { margin: 6px 0 0; color: #6b7280; font-size: 14px; line-height: 1.5; }

        /* ===========================
           ABOUT US (NEW) — modern 3D background
           =========================== */
        .about-intro {
          max-width: 1200px;
          margin: 18px auto 8px;
          padding: 28px 22px;
          border-radius: 16px;
          background:
            radial-gradient(500px 120px at 6% 22%, rgba(124,58,237,0.04), transparent 12%),
            linear-gradient(180deg, #ffffff 0%, #fbfbff 35%, #f6f2ff 100%);
          box-shadow: 0 18px 50px rgba(15,23,42,0.04);
          /* ensure scrolling to #about places the intro below sticky header */
          scroll-margin-top: calc(var(--header-h) + 20px);
        }
        .about-title {
          font-size: clamp(28px, 4.2vw, 36px);
          font-weight: 900;
          margin: 0 0 12px;
          color: #0f172a;
        }
        .about-text {
          color: #4b5563;
          font-size: 15px;
          line-height: 1.7;
          max-width: 880px;
        }
        .mv-grid {
          display:grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 18px;
          max-width: 920px;
        }
        .mv-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 12px 30px rgba(2,6,23,0.04);
          display:flex; gap: 12px; align-items:flex-start;
        }
        .mv-icon {
          width: 48px; height: 48px; border-radius: 10px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background: linear-gradient(180deg,#eef2ff,#f8f7ff);
        }
        .mv-content h4 { margin:0; font-size:15px; font-weight:800; color:#0f172a; }
        .mv-content p { margin:6px 0 0; color:#6b7280; font-size:13px; line-height:1.5; }

        /* about-details: feature cards + image */
        .about-details {
          max-width: 1200px;
          margin: 10px auto 36px;
          padding: 26px 22px;
          border-radius: 16px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          align-items: center;
          background:
            radial-gradient(600px 140px at 90% 20%, rgba(99,102,241,0.03), transparent 12%),
            linear-gradient(180deg, #ffffff 0%, #fbfbff 35%, #f6f2ff 100%);
          box-shadow: 0 18px 50px rgba(15,23,42,0.04);
        }

        .details-inner {
          display:grid;
          grid-template-columns: 1fr;
          gap: 18px;
          align-items:center;
        }

        /* left: features grid; right: image */
        .details-features {
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .feature-card {
          background: white;
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 14px 36px rgba(2,6,23,0.04);
          display:flex; gap:12px; align-items:flex-start;
        }
        .feature-icon {
          width:48px; height:48px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0;
          background: linear-gradient(180deg, rgba(255,143,0,0.08), rgba(255,238,217,0.04));
        }
        .feature-body h4 { margin:0; font-size:16px; font-weight:800; color:#0f172a; }
        .feature-body p { margin:8px 0 0; color:#6b7280; font-size:13px; line-height:1.6; }

        .details-image-wrap { display:flex; align-items:center; justify-content:center; }
        .details-image {
          width:100%; max-width:560px; height:auto; border-radius:12px; box-shadow:0 18px 40px rgba(15,23,42,0.06); object-fit:cover;
        }

        /* ===========================
           BLOGS SECTION
           =========================== */
        .blogs-section {
          max-width: 1200px;
          margin: 20px auto 60px;
          padding: 28px 18px;
          text-align: center;
          scroll-margin-top: calc(var(--header-h) + 20px);
        }
        .blogs-title {
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 900;
          margin: 18px 0 26px;
          color: #0f172a;
        }
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          align-items: start;
        }
        .blog-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          text-align: left;
          box-shadow: 0 18px 40px rgba(2,6,23,0.04);
        }
        .blog-card h4 {
          margin: 0 0 10px;
          font-size: 16px;
          font-weight: 800;
          color: #0b1220;
        }
        .blog-card p {
          margin: 0 0 14px;
          color: #6b7280;
          font-size: 14px;
          line-height: 1.6;
        }
        .blog-meta { font-size: 13px; color:#4b5563; display:flex; gap:12px; align-items:center; }

        @media(max-width: 1150px) {
          .blogs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media(max-width: 899px) {
          .blogs-grid { grid-template-columns: 1fr; }
        }

        /* ===========================
           SOLUTIONS EXTRA — recreated checklist card
           - centered, crisp text, icons
           - plain / subtle gradient background
           - responsive grid: left checklist / right why+image
           =========================== */
        .solutions-extra {
          max-width: 1200px;
          margin: 40px auto 10px;
          padding: 32px 20px 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          scroll-margin-top: calc(var(--header-h) + 20px);
        }

        .solutions-card {
          width: 100%;
          max-width: 960px;
          background: linear-gradient(180deg, #ffffff 0%, #fbfbff 40%, #f6f1ff 100%);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 26px 80px rgba(15,23,42,0.08);
          display: block;
          margin: 0 auto;
          scroll-margin-top: calc(var(--header-h) + 20px);
        }

        /* create a grid inside the card */
        .solutions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 22px;
          align-items: start;
        }

        @media(min-width: 900px) {
          .solutions-grid {
            grid-template-columns: 1fr 380px; /* left checklist / right why+image */
            gap: 28px;
          }
        }

        /* center the ribbon */
        .solutions-ribbon {
          display: block;
          margin: 0 0 18px;
          max-width: 760px;
          text-align: center;
          background: linear-gradient(90deg,#9b6df3,#d18cf8);
          color: white;
          padding: 10px 22px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 15px;
          box-shadow: 0 8px 30px rgba(155,109,243,0.08);
        }

        .solutions-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 360px;
        }

        .solutions-list-wrap {
          display: flex;
          justify-content: center;
        }

        .solutions-list {
          margin: 6px 0 8px;
          padding: 10px 8px 6px 8px;
          list-style: none;
          display: grid;
          gap: 12px;
          max-width: 760px;
          width: 100%;
        }

        .solution-item {
          display: flex;
          gap: 14px;
          align-items: center;
          font-size: 18px;
          line-height: 1.35;
          color: #0b1220;
          font-weight: 700;
        }

        .solution-item .check {
          width: 34px;
          height: 34px;
          min-width: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #e6ffef;
          border-radius: 10px;
          box-shadow: inset 0 -1px 0 rgba(0,0,0,0.02);
          color: #059669;
        }

        /* icons area bottom-left (added back per request) */
        .solutions-icons {
          display: flex;
          gap: 12px;
          margin-top: 12px;
          align-items: center;
        }
        .icon-small {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: white;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow: 0 10px 30px rgba(15,23,42,0.05);
        }
        .icon-small svg { width:28px; height:28px; }

        /* RIGHT: why block and image */
        .solutions-why {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          justify-content: flex-start;
          background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,255,0.98));
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 12px 36px rgba(15,23,42,0.04);
        }
        .why-title {
          display:flex; align-items:center; gap:10px; font-size:20px; font-weight:900; color:#9b2a8e; margin:0 0 0;
        }
        .why-text {
          color: #0b1220;
          font-size:16px;
          line-height:1.6;
          margin: 0;
          font-weight:700;
        }
        .why-sub {
          margin-top:8px;
          color:#374151;
          font-size:14px;
          line-height:1.6;
        }

        /* image under why block */
        .why-image-wrap {
          width: 100%;
          display:flex;
          justify-content:center;
          margin-top: 6px;
        }
        .why-image {
          width: 358px;
          height: 453px;
          max-width: 100%;
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 0 12px 36px rgba(15,23,42,0.06);
          background: white;
          display:block;
        }

        @media(max-width: 899px) {
          .solutions-card { padding: 18px; border-radius: 12px; }
          .solutions-grid { grid-template-columns: 1fr; gap: 14px; }
          .solutions-ribbon { font-size: 14px; padding: 8px 16px; }
          .solution-item { font-size: 15px; gap:10px; }
          .solution-item .check { width:28px; height:28px; min-width:28px; border-radius:8px; }
          .solutions-extra { padding: 18px 12px 6px; margin-top: 22px; margin-bottom: 26px; }
          .solutions-list { gap:10px; padding: 6px; }
          .why-title { font-size:18px; }
          .why-text { font-size:15px; }
          .solutions-why { padding: 14px; margin: 0; }
          .why-image { width: 100%; height: auto; max-width: 420px; }
          .solutions-icons { margin-top: 6px; }
        }

        /* Desktop larger spacing */
        @media(min-width: 900px) {
          .solutions-card { padding: 28px 28px; }
          .solutions-left { min-height: 520px; } /* keep left long so icons sit near bottom */
        }

        /* Desktop layout: features left, image right */
        @media(min-width: 900px) {
          .details-inner { grid-template-columns: 1fr 560px; align-items:start; gap:28px; }
          .details-features { grid-template-columns: 1fr 1fr; }
          .about-intro { padding: 30px 28px; margin-top: 30px; }
          .about-details { padding: 28px 28px; }
          .mv-grid { max-width: 680px; }
        }

        /* Mobile adjustments */
        @media(max-width: 899px) {
          .eps-container { padding: 10px 14px; }
          .eps-logo { width:72px; height:72px; }
          .company-title { font-size:16px; }
          .company-sub { font-size:11px; }
          .eps-nav { display:none; }

          .hero { padding: 12px 12px 6px; min-height: auto; align-items:flex-start; }
          .hero-inner { display:flex; flex-direction:column; gap:12px; align-items: flex-start; }
          .hero-left { order: 1; }
          .hero-right { order: 2; margin-top: 8px; width:100%; display:flex; justify-content:center; }
          .hero-gif { max-width: 92%; }

          .contact-btn { padding:8px 10px; font-size:13px; border-radius:10px; }
          .hamburger { display:inline-flex; }
          .mobile-panel { position: absolute; left:0; right:0; top:64px; z-index:88; }

          .expertise-section { margin: 10px 12px; padding: 14px; }
          .expertise-img { width: 320px; height: 330px; }

          .services-wrap { margin: 12px 12px 40px; }
          .service-item { grid-template-columns: 44px 1fr; gap: 10px; }
          .service-number { font-size: 32px; color: rgba(15,23,42,0.08); padding-top: 4px; }
          .service-content h3 { font-size: 15px; }
          .service-content p { font-size: 13px; }

          .mv-grid { grid-template-columns: 1fr; gap: 12px; }
          .mv-card { padding: 14px; }
          .mv-icon { width:48px; height:48px; }

          .details-inner { grid-template-columns: 1fr; }
          .details-features { grid-template-columns: 1fr; }
          .feature-card { padding:12px; }
          .feature-icon { width:44px; height:44px; }
          .details-image { max-width: 92%; }
        }

        @media(min-width:900px) {
          .eps-nav { display:flex; }
          .hamburger { display:none; }
          .mobile-panel { display:none !important; }
        }

        /* ===========================
           CONTACT / FOOTER-LIKE SECTION
           =========================== */
        .contact-section {
          max-width: 1200px;
          margin: 36px auto 40px;
          padding: 28px 22px;
          border-radius: 12px;
          background: linear-gradient(180deg, #ffffff 0%, #fbfbff 50%, #f6f4ff 100%);
          box-shadow: 0 18px 50px rgba(15,23,42,0.04);
          scroll-margin-top: calc(var(--header-h) + 20px);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          align-items: start;
        }
        @media(min-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 28px;
          }
        }

        /* column 1: logo + about + socials */
        .contact-brand {
          display:flex; flex-direction:column; gap:12px; align-items:flex-start;
        }
        .contact-brand .brand-row {
          display:flex; gap:12px; align-items:center;
        }
        .contact-brand .foot-logo {
          width:72px; height:72px; object-fit:contain; border-radius:10px; box-shadow: 0 12px 30px rgba(15,23,42,0.04);
        }
        .contact-brand .brand-title {
          font-weight:900; font-size:20px; color:#0b1220;
        }
        .contact-brand .brand-desc {
          color:#6b7280; font-size:14px; line-height:1.6; max-width:360px;
        }
        .social-row { display:flex; gap:10px; margin-top:8px; }
        .social-btn {
          display:inline-flex; align-items:center; justify-content:center;
          width:42px; height:42px; border-radius:999px; background:white; border:1px solid rgba(15,23,42,0.04);
          box-shadow: 0 8px 20px rgba(2,6,23,0.04);
        }
        .social-btn svg { width:18px; height:18px; }

        /* column 2: Our Expert Services */
        .contact-services h4 {
          margin:0 0 12px; font-size:18px; font-weight:900; color:#0b1220;
        }
        .contact-services ul { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; }
        .contact-services li { color:#4b5563; font-size:14px; }

        /* column 3: Get In Touch */
        .contact-touch h4 {
          margin:0 0 12px; font-size:18px; font-weight:900; color:#0b1220;
        }
        .touch-item {
  display: flex;
  gap: 10px;
  align-items: center; /* ensures icons and text are vertically centered */
  margin-bottom: 12px;
  color: #0b1220;
  font-size: 15px;
  font-weight: 700;
}

.touch-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #fff, #fafafa);
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.03);
}

.touch-icon img {
  width: 22px;
  height: 22px;
  display: block;
}

        .touch-details { line-height:1.4; }

        /* small footer copyright row */
        .contact-copyright {
          margin-top:18px; padding-top:12px; border-top:1px solid rgba(15,23,42,0.04); color:#6b7280; font-size:13px; display:flex; justify-content:space-between; align-items:center;
        }
        @media(max-width:899px) {
          .contact-copyright { flex-direction:column; gap:10px; align-items:flex-start; }
        }
      `}</style>

      {/* ===========================
          HEADER + MOBILE PANEL
          =========================== */}
      <header className="eps-header" role="banner">
        <div className="eps-container">
          <a href="/" className="eps-left" aria-label="home">
            <img src="/logo.jpg" alt="EcomPlus logo" className="eps-logo" />
            <div className="company-name">
              <div className="company-title">EcomPlus Solutions</div>
              <div className="company-sub">Your Trusted E-commerce Partner</div>
            </div>
          </a>

          <nav className="eps-nav" role="navigation" aria-label="Primary">
            {/* changed to call goToId to scroll to the About section */}
            <a onClick={() => goToId("top")}>Home</a>
            <a onClick={() => goToId("about")}>About us</a>
            <a onClick={() => goToId("blogs")}>Blogs</a>
            <a onClick={() => goToId("solutions")}>Solutions</a>
            <a onClick={() => goToId("contact")} style={{ fontWeight: 800 }}>Contact us</a>
          </nav>

          <div className="header-actions">
            <a
  href="https://api.whatsapp.com/message/7YQ6T7DCQZJLJ1?autoload=1&app_absent=0"
  target="_blank"
  rel="noopener noreferrer"
  className="contact-btn"
>
  Contact us
</a>

            <button
              aria-label="Toggle menu"
              className="hamburger"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 18L18 6M6 6l12 12" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`mobile-panel ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
          {mobileOpen && (
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: 8 }}>
              <div className="mobile-links">
                <a onClick={() => goToId("top")}>Home</a>
                <a onClick={() => goToId("about")}>About us</a>
                <a onClick={() => goToId("blogs")}>Blogs</a>
                <a onClick={() => goToId("solutions")}>Solutions</a>
                <a onClick={() => goToId("contact")} style={{ fontWeight: 800 }}>Contact us</a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ===========================
         HERO
         =========================== */}
      <section className="hero" aria-label="Hero" id="top">
        <div className="hero-bg" aria-hidden="true" />
        <div className="blob-a" aria-hidden="true" />
        <div className="blob-b" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-left">
            <h2 className="hero-h1">
              <span className="smallIntro">We Partner with Promising</span>
              <span className="big">Ecommerce Brands<br />& Accelerate Their Growth</span>
            </h2>

            <div className="hero-row" style={{ marginTop: 8 }}>
              <span className="hero-in">in</span>
              <span className={`highlight ${visible ? "" : "hidden"}`} aria-live="polite">{rotating[index]}</span>
            </div>
          </div>

          <div className="hero-right" role="img" aria-label="Hero animation">
            <img src="/hero.gif" alt="Ecommerce growth animation" className="hero-gif" />
          </div>
        </div>
      </section>

      {/* ===========================
         OUR EXPERTISE
         =========================== */}
      <section className="expertise-section" aria-label="Our Expertise">
        <h2 className="expertise-title">Our Expertise</h2>
        <img src="/expertise.png" alt="Expertise chart" className="expertise-img" />
      </section>

      {/* ===========================
         SERVICES
         =========================== */}
      <div className="services-wrap" aria-label="How we work">
        <div className="services-card" role="region">
          <div className="services-list">
            <div className="service-item">
              <div className="service-number">1</div>
              <div className="service-content">
                <h3>Brand Due Diligence</h3>
                <p>We analyze brand position, competitors, and growth potential.</p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-number">2</div>
              <div className="service-content">
                <h3>Data Sharing & Legal Formalities</h3>
                <p>We secure data sharing, NDAs, and legal compliance setup.</p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-number">3</div>
              <div className="service-content">
                <h3>Catalog & Brand Identity Development</h3>
                <p>We build consistent product catalog and unique brand identity.</p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-number">4</div>
              <div className="service-content">
                <h3>Marketplace Growth Plan</h3>
                <p>We expand marketplace presence and optimize sales strategies.</p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-number">5</div>
              <div className="service-content">
                <h3>Tech Integration, Execution & Monthly Tracking</h3>
                <p>We implement tools for smooth ops and track monthly performance.</p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-number">6</div>
              <div className="service-content">
                <h3>AI-Driven Marketing & Growth & Sales Analytics</h3>
                <p>We use AI for targeted marketing and predictive sales growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================
         ABOUT INTRO
         =========================== */}
      <section className="about-intro" aria-label="About introduction" id="about">
        <h3 className="about-title">Introduction</h3>
        <p className="about-text">
          Founded in July 2025, EcomPlus Solutions has quickly established itself as a trusted
          partner for brands seeking measurable growth online. We combine deep marketplace
          expertise, modern technology and data-driven marketing to accelerate discoverability,
          conversions and long-term value for our clients. Our approach is collaborative,
          transparent and focused on delivering scalable results.
        </p>

        <div className="mv-grid" aria-hidden>
          <div className="mv-card" role="article" aria-labelledby="mission-title">
            <div className="mv-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12l4 4 4-4" stroke="#6b21a8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 12l4 4 3-3" stroke="#4f46e5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="mv-content">
              <h4 id="mission-title">Mission</h4>
              <p>Empower brands with marketplace-ready strategies, technology and execution to reach their growth potential.</p>
            </div>
          </div>

          <div className="mv-card" role="article" aria-labelledby="vision-title">
            <div className="mv-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l4 6-4 5-4-5 4-6z" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="#fff"/>
                <path d="M3 10l2 10 7-6 7 6 2-10-9-7-9 7z" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="mv-content">
              <h4 id="vision-title">Vision</h4>
              <p>Become a long-term growth partner for brands across marketplaces by building resilient, tech-enabled commerce engines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
         ABOUT DETAILS
         =========================== */}
      <section className="about-details" aria-label="About details">
        <div className="details-inner">
          <div className="details-features" aria-hidden>
            <div className="feature-card" role="article" aria-label="Commitment to Clients">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="#ff8f00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 20c0-3.31 2.69-6 6-6h8c3.31 0 6 2.69 6 6" stroke="#ff8f00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="feature-body">
                <h4>Commitment to Clients</h4>
                <p>At EcomPlus, our focus is on the client's success — personalized strategies, deep product understanding and continuous operational support to deliver reliable growth.</p>
              </div>
            </div>

            <div className="feature-card" role="article" aria-label="Growth and Achievements">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3v18h18" stroke="#ff8f00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 14l3-4 4 6 3-8" stroke="#ff8f00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="feature-body">
                <h4>Growth and Achievements</h4>
                <p>We consistently drive measurable results — expanding teams, increasing revenues and setting a high bar for performance for our partners.</p>
              </div>
            </div>

            <div className="feature-card" role="article" aria-label="Technology and Innovation">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="12" rx="2" stroke="#ff8f00" strokeWidth="1.6"/>
                  <path d="M8 20h8" stroke="#ff8f00" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="feature-body">
                <h4>Technology and Innovation</h4>
                <p>We leverage modern tooling — data analytics, automation and AI-driven marketing — so brands can make faster, smarter decisions.</p>
              </div>
            </div>

            <div className="feature-card" role="article" aria-label="Future Outlook">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 16.58A5 5 0 0016 7h-1" stroke="#ff8f00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 16.5A4.5 4.5 0 017.5 12H8" stroke="#ff8f00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 20h8" stroke="#ff8f00" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="feature-body">
                <h4>Future Outlook</h4>
                <p>We are focused on expansion and continued innovation — building resilient commerce engines that perform across marketplaces and geographies.</p>
              </div>
            </div>
          </div>

          <div className="details-image-wrap" aria-hidden>
            <img src="/about-img.jpg" alt="About illustration" className="details-image" />
          </div>
        </div>
      </section>

      {/* ===========================
         BLOGS (added below About Details)
         =========================== */}
      <section className="blogs-section" aria-label="Blogs" id="blogs">
        <h2 className="blogs-title">How to Grow Business Online</h2>

        <div className="blogs-grid" role="list">
          <article className="blog-card" role="listitem">
            <h4>What is a D2C Business Model? | Different Between B2C & D2C</h4>
            <p>What is a D2C Business Model? D2C Business Model (Direct-to-Consumer) :A D2C Business Model Involves...</p>
            <div className="blog-meta">
              <span>Joseph</span>
              <span>June 13, 2025</span>
            </div>
          </article>

          <article className="blog-card" role="listitem">
            <h4>Amazon and Flipkart Advertising: A Beginner’s Guide</h4>
            <p>Amazon and Flipkart Advertising: A Beginner’s Guide In India’s competitive e-commerce landscape, advertising is essential...</p>
            <div className="blog-meta">
              <span>dosneh</span>
              <span>December 11, 2024</span>
            </div>
          </article>

          <article className="blog-card" role="listitem">
            <h4>Glossary of Online Advertising in E-commerce</h4>
            <p>Glossary of Online Advertising in E-commerce In the fast-paced world of e-commerce, advertising is essential...</p>
            <div className="blog-meta">
              <span>Roy</span>
              <span>December 11, 2024</span>
            </div>
          </article>
        </div>
      </section>

      {/* ===========================
         SOLUTIONS EXTRA (recreated checklist card) — final section update
         - This replaces the plain image and reproduces checklist + icons
         - Centered ribbon, grid: left checklist / right why+image
         =========================== */}
      <section className="solutions-extra" aria-label="Solutions extra" id="solutions">
        <div className="solutions-card" role="region" aria-labelledby="sol-title">
          <div className="solutions-grid">
            {/* LEFT: checklist + icons */}
            <div className="solutions-left">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="solutions-ribbon">OUR ALL ACCOUNT MANAGEMENT SERVICES INCLUDE:</div>
              </div>

              <div className="solutions-list-wrap" aria-hidden>
                <ul className="solutions-list">
                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>End-to-end account setup & management</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>Product listing & cataloging</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>SEO-rich titles, bullet points & descriptions</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>Sponsored ads & campaign management</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>Pricing, offers & inventory handling</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>Order processing & return management</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>Suppressed listing & error solutions</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>Performance tracking & growth strategies</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>Customer query handling & support</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>Digital marketing & social media promotions</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>Brand store creation & A+ content</li>

                  <li className="solution-item"><span className="check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 6l4 4L15 1" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>Account health & policy compliance</li>
                </ul>
              </div>

              {/* icons bottom-left (per request) */}
              <div style={{ marginTop: "auto" }}>
                <div className="solutions-icons" aria-hidden>
                  <div className="icon-small" title="Quality badge">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M12 2v6" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.5 8.5L6 20l6-4 6 4-1.5-11.5" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="icon-small" title="Verification">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M12 2l7 3v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="icon-small" title="Partnership">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M3 12l7 6 4-3 7 4" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 7l-4 3-4-3-6.5 5" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Why block + image */}
            <div className="solutions-why" aria-hidden={false}>
              <div className="why-title">🧳 Why Choose EcomPlus Solutions?</div>
              <div className="why-text">
                We provide end-to-end support for online sellers across top marketplaces like
                Amazon | Flipkart | Meesho | Myntra | Snapdeal | Ajio and More.— helping you grow faster with smarter e-commerce management.
              </div>
              <div className="why-sub">
                ✓ 100% Satisfaction Guarantee<br />
                ✓ Dedicated Expert Team & Excellent Support
              </div>

              {/* image (desktop: shows at bottom of right column; mobile: stacks and remains below everything) */}
              <div className="why-image-wrap" aria-hidden={false}>
                <img
                  src="/solutionback.png"
                  alt="Marketplace logos (Amazon, Flipkart, Meesho, Myntra, Snapdeal, Ajio)"
                  className="why-image"
                  width={358}
                  height={453}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
         CONTACT SECTION (footer-like) — ADDED
         id="contact" so header nav scrolls to it
         =========================== */}
      <section id="contact" className="contact-section" aria-label="Contact">
        <div className="contact-grid">
          {/* Column 1: Brand logo, name, short description, social icons */}
          <div className="contact-brand" role="region" aria-labelledby="brand-heading">
            <div className="brand-row">
              <img src="/logo.jpg" alt="EcomPlus / Brand logo" className="foot-logo" />
              <div>
                <div id="brand-heading" className="brand-title">EcomPlus Solutions</div>
                <div className="brand-sub" style={{ color: "#6b7280", fontSize: 13 }}>Your Trusted E-commerce Partner</div>
              </div>
            </div>

            <div className="brand-desc">
              EcomPlus Solutions helps brands accelerate marketplace growth with catalog, ads,
              operations and customer support. We combine data-driven marketing with marketplace
              expertise to build reliable, scalable commerce engines.
            </div>

            <div className="social-row" aria-label="Social links">
                <a
    href="https://www.facebook.com/share/1ZRKE7ZgCD/"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn"
    aria-label="Facebook"
  >
    <img
      src="/facebook.png"
      alt="Facebook"
      style={{ width: 32, height: 32, display: "block" }}
    />
  </a>

               <a
    href="https://www.instagram.com/ecomplus.solutions?igsh=bnJjcG9kanlpMTU5"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn"
    aria-label="Instagram"
  >
    <img
      src="/instagram.jfif"
      alt="Instagram"
      style={{ width: 28, height: 28, display: "block" }}
    />
  </a>

              <a
    href="https://api.whatsapp.com/message/7YQ6T7DCQZJLJ1?autoload=1&app_absent=0"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn"
    aria-label="WhatsApp"
  >
    <img
      src="whatsapp.jfif"
      alt="WhatsApp"
      style={{ width: 28, height: 28, display: "block" }}
    />
  </a>
            </div>
          </div>

          {/* Column 2: Our Expert Services */}
          <div className="contact-services" role="region" aria-labelledby="services-heading">
            <h4 id="services-heading">Our Expert Services</h4>
            <ul>
              <li>Strategic Ecommerce Onboarding</li>
              <li>Accelerated Growth</li>
              <li>Data-Driven Insights</li>
              <li>Digital Brand Building & Marketing</li>
              <li>Latest Technology Adoption</li>
            </ul>
          </div>

          {/* Column 3: Get In Touch With Us */}
          <div className="contact-touch" role="region" aria-labelledby="touch-heading">
            <h4 id="touch-heading">Get In Touch With Us</h4>

            <div className="touch-item">
  <div className="touch-icon">
    <img src="/phone.png" alt="Phone" style={{ width: 30, height: 24, display: "block" }} />
  </div>
  <div className="touch-details">
    <a href="tel:+919265346747" style={{ color: "#0b1220", fontWeight: 700, textDecoration: "none" }}>
      +91 9265346747
    </a>
  </div>
</div>

<div className="touch-item">
  <div className="touch-icon">
    <img src="/mail.png" alt="Email" style={{ width: 22, height: 22, display: "block" }} />
  </div>
  <div className="touch-details">
    <a href="mailto:ecomplus.solutions11@gmail.com" style={{ color: "#0b1220", fontWeight: 700, textDecoration: "none" }}>
      ecomplus.solutions11@gmail.com
    </a>
  </div>
</div>

<div className="touch-item">
  <div className="touch-icon">
    <img src="/location.png" alt="Location" style={{ width: 28, height: 22, display: "block" }} />
  </div>
  <div className="touch-details" style={{ color: "#0b1220", fontWeight: 700 }}>
    Surat, Gujarat, India
  </div>
</div>


          </div>
        </div>

        <div className="contact-copyright">
          <div>Copyright © {new Date().getFullYear()} EcomPlus Solutions. All Rights Reserved</div>
          <div style={{ display: "flex", gap: 14 }}>
            <a href="#privacy" style={{ color: "#6b7280", textDecoration: "none" }}>Privacy policy</a>
            <a href="#terms" style={{ color: "#6b7280", textDecoration: "none" }}>Terms & Conditions</a>
          </div>
        </div>
      </section>

    </div>
  );
}
