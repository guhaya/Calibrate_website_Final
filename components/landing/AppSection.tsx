"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Arrow, Device } from "./ui";

const orbit = [
  { label: "Workouts", x: "6%", y: "14%" },
  { label: "Macro targets", x: "2%", y: "46%" },
  { label: "Recovery score", x: "9%", y: "76%" },
  { label: "Coach chat", x: "80%", y: "10%" },
  { label: "A.L.F.R.E.D AI", x: "84%", y: "42%" },
  { label: "Fasting timer", x: "79%", y: "74%" },
  { label: "Apple Health", x: "22%", y: "2%" },
  { label: "Health Connect", x: "64%", y: "92%" },
];

const tiles = [
  {
    area: "chat",
    title: "Your coach, one tap away",
    body: "Message your coach inside the app, share wins and struggles, and get your weekly check-in reviewed where your data already lives.",
    img: "/media/app/messages.webp",
    alt: "Vemisis coach messages screen",
  },
  {
    area: "ai",
    title: "An AI assistant trained on your coach's playbook",
    body: "Ask about nutrition, training, supplements or recovery and get answers grounded in the CALIBRATE method, not random internet advice.",
    img: "/media/app/alfred.webp",
    alt: "Vemisis A.L.F.R.E.D AI assistant screen",
  },
  {
    area: "rec",
    title: "Train when you're ready",
    body: "A daily readiness score built from HRV, resting heart rate and sleep.",
    img: "/media/app/recovery.webp",
    alt: "Vemisis recovery screen showing a readiness score of 72",
  },
  {
    area: "food",
    title: "Log a meal in seconds",
    body: "Barcode scanning and a food database that covers Indian and global cuisine.",
    img: "/media/app/food-log.webp",
    alt: "Vemisis food log screen with meals and macros",
  },
  {
    area: "fast",
    title: "Fasting, built in",
    body: "16:8, 18:6, OMAD or custom protocols with a live timer and metabolic stages.",
    img: "/media/app/fasting.webp",
    alt: "Vemisis fasting timer screen",
  },
  {
    area: "sync",
    title: "Syncs with what you already wear",
    body: "Apple Health, Apple Watch and Oura on iPhone, Health Connect on Android. Steps, sleep, HRV and workouts flow in automatically.",
    img: "/media/app/connections.webp",
    alt: "Vemisis connections screen for Apple Health and wearables",
  },
];

export default function AppSection() {
  const fanRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: fanRef, offset: ["start end", "center center"] });
  const spread = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);
  const xL = useTransform(spread, [0, 1], ["35%", "0%"]);
  const xR = useTransform(spread, [0, 1], ["-35%", "0%"]);
  const rL = useTransform(spread, [0, 1], [0, -9]);
  const rR = useTransform(spread, [0, 1], [0, 9]);
  const yC = useTransform(spread, [0, 1], [80, 0]);

  return (
    <section className="sec app" id="vemisis">
      <div className="wrap-wide">
        <div className="panel app-panel">
          <div className="app-glow" aria-hidden="true" />
          <div className="app-dots dot-grid" aria-hidden="true" />

          <div className="sec-head" style={{ marginBottom: 40 }}>
            <Image src="/media/brand/vemisis-app-icon.png" alt="Vemisis app icon" width={84} height={84} className="app-icon rv rv-scale" />
            <span className="tag rv" style={{ ["--d" as string]: "60ms" }}>Meet Vemisis, the CALIBRATE app</span>
            <h2 className="display-lg rv balance" style={{ ["--d" as string]: "120ms" }}>
              Your coach. Your plan. One app.
            </h2>
            <p className="lead rv" style={{ ["--d" as string]: "200ms", maxWidth: 640 }}>
              Vemisis is the training app built for CALIBRATE clients. Sessions, macros, recovery and your coach live
              in one place, so every day is already decided before you wake up.
            </p>
          </div>

          <div className="app-fan" ref={fanRef}>
            {orbit.map((o, i) => (
              <span key={o.label} className="app-orb" style={{ left: o.x, top: o.y, ["--i" as string]: i }}>
                {o.label}
              </span>
            ))}
            <motion.div className="app-ph app-ph-l" style={{ x: xL, rotate: rL }}>
              <Device src="/media/app/training.webp" alt="Vemisis training screen with today's session" width="100%" sizes="280px" />
            </motion.div>
            <motion.div className="app-ph app-ph-c" style={{ y: yC }}>
              <Device src="/media/app/home.webp" alt="Vemisis home screen" width="100%" sizes="320px" />
            </motion.div>
            <motion.div className="app-ph app-ph-r" style={{ x: xR, rotate: rR }}>
              <Device src="/media/app/nutrition.webp" alt="Vemisis nutrition screen with calorie ring" width="100%" sizes="280px" />
            </motion.div>
          </div>
        </div>

        <div className="bento">
          {tiles.map((t, i) => (
            <article key={t.area} className={`card card-hover bento-tile bt-${t.area} rv`} style={{ gridArea: t.area, ["--d" as string]: `${(i % 3) * 80}ms` }}>
              <div className="bt-copy">
                <h3 className="bt-title">{t.title}</h3>
                <p className="body-sm">{t.body}</p>
              </div>
              <div className="bt-shot">
                <Image src={t.img} alt={t.alt} width={640} height={1391} sizes="(max-width: 900px) 70vw, 320px" />
              </div>
            </article>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <Link href="/features" className="btn-secondary">See everything inside Vemisis <Arrow /></Link>
        </div>
      </div>

      <style>{`
        .app-panel { padding: 96px 24px 0; background: radial-gradient(120% 70% at 50% 0%, #15151A 0%, #0B0B0D 60%); }
        .app-glow { position: absolute; left: 50%; bottom: -260px; width: 1100px; height: 620px; margin-left: -550px; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,222,2,0.42), rgba(255,222,2,0.08) 60%, transparent); z-index: -1; }
        .app-dots { position: absolute; inset: 0; z-index: -1; opacity: 0.35; -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 30%, #000, transparent 70%); mask-image: radial-gradient(ellipse 60% 50% at 50% 30%, #000, transparent 70%); }
        .app-icon { border-radius: 22px; box-shadow: 0 20px 50px -10px rgba(255,222,2,0.4); }
        .app-fan { position: relative; height: 640px; max-width: 1000px; margin: 0 auto; display: flex; justify-content: center; align-items: flex-start; }
        .app-ph { position: absolute; top: 40px; }
        .app-ph-c { width: 300px; z-index: 3; top: 0; }
        .app-ph-l, .app-ph-r { width: 250px; z-index: 2; top: 70px; }
        .app-ph-l { left: calc(50% - 360px); }
        .app-ph-r { right: calc(50% - 360px); }
        .app-orb {
          position: absolute; z-index: 4;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 14px; border-radius: 999px;
          font-size: 13px; font-weight: 700; color: #fff; white-space: nowrap;
          background: rgba(22,22,27,0.8); border: 1px solid var(--line-strong);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          animation: bob 6s ease-in-out infinite; animation-delay: calc(var(--i) * -0.8s);
          box-shadow: 0 14px 30px -10px rgba(0,0,0,0.6);
        }

        .bento {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-areas:
            "chat chat ai"
            "rec food ai"
            "fast sync sync";
          gap: 20px;
        }
        .bento-tile { display: flex; flex-direction: column; padding: 32px 32px 0; min-height: 420px; }
        .bt-copy { display: flex; flex-direction: column; gap: 10px; max-width: 460px; position: relative; z-index: 1; }
        .bt-title { font-family: var(--font-display); font-size: clamp(26px, 2.3vw, 34px); line-height: 1; }
        .bt-shot {
          margin-top: auto; padding-top: 28px; align-self: center; width: 62%; max-width: 270px;
          -webkit-mask-image: linear-gradient(#000 70%, transparent); mask-image: linear-gradient(#000 70%, transparent);
          transition: transform 0.7s var(--ease-out);
        }
        .bt-shot img { width: 100%; height: auto; border-radius: 26px 26px 0 0; border: 1px solid var(--line-strong); border-bottom: none; max-height: 300px; object-fit: cover; object-position: top; }
        .bento-tile:hover .bt-shot { transform: translateY(-8px); }
        .bt-chat, .bt-sync { flex-direction: row; gap: 24px; padding-bottom: 0; }
        .bt-chat .bt-copy, .bt-sync .bt-copy { flex: 1; align-self: center; padding-bottom: 32px; }
        .bt-chat .bt-shot, .bt-sync .bt-shot { width: 46%; align-self: flex-end; margin-top: 0; }
        .bt-ai { background: linear-gradient(180deg, #17170F 0%, var(--surface-1) 55%); border-color: rgba(255,222,2,0.22); }
        .bt-ai .bt-shot { width: 78%; max-width: 300px; }
        .bt-ai .bt-shot img { max-height: 520px; }

        @media (max-width: 1100px) {
          .app-ph-l { left: calc(50% - 300px); }
          .app-ph-r { right: calc(50% - 300px); }
          .app-orb:nth-of-type(n+7) { display: none; }
        }
        @media (max-width: 900px) {
          .app-panel { padding-top: 72px; }
          .app-fan { height: 520px; }
          .app-ph-c { width: 230px; }
          .app-ph-l, .app-ph-r { width: 180px; top: 60px; }
          .app-ph-l { left: calc(50% - 230px); }
          .app-ph-r { right: calc(50% - 230px); }
          .app-orb { font-size: 11.5px; padding: 7px 11px; }
          .app-orb:nth-of-type(n+5) { display: none; }
          .bento { grid-template-columns: 1fr 1fr; grid-template-areas: "chat chat" "ai ai" "rec food" "fast fast" "sync sync"; }
        }
        @media (max-width: 600px) {
          .app-fan { height: 430px; }
          .app-ph-c { width: 190px; }
          .app-ph-l, .app-ph-r { width: 140px; }
          .app-ph-l { left: calc(50% - 170px); }
          .app-ph-r { right: calc(50% - 170px); }
          .app-orb { display: none; }
          .bento { grid-template-columns: 1fr; grid-template-areas: "chat" "ai" "rec" "food" "fast" "sync"; }
          .bento-tile { padding: 26px 22px 0; min-height: 0; }
          .bt-chat, .bt-sync { flex-direction: column; }
          .bt-chat .bt-copy, .bt-sync .bt-copy { padding-bottom: 0; }
          .bt-chat .bt-shot, .bt-sync .bt-shot, .bt-shot { width: 70%; align-self: center; margin-top: 8px; }
        }
      `}</style>
    </section>
  );
}
