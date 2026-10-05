"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Arrow, Device, Hl, RiseLine } from "./ui";

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -90]);
  const yRight = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -60]);
  const yCoach = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);
  const ribbonRot = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-2, 4]);

  return (
    <section className="hero">
      <div className="hero-bg grid-lines" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="wrap hero-copy">

        <h1 className="hero-title">
          <span className="hero-line">
            <RiseLine text="Stop guessing." delay={120} />
            <span className="sticker hero-sticker">Built for busy professionals</span>
          </span>
          <span className="hero-line">
            <RiseLine text="Start" delay={320} />{" "}
            <span className="rise">
              <span style={{ ["--d" as string]: "400ms" }}>
                <Hl ink>calibrating</Hl>
              </span>
            </span>
          </span>
        </h1>

        <p className="lead hero-lead rv" style={{ ["--d" as string]: "500ms" }}>
          Precision body recomposition coaching from GVNFIT, adjusted every week and delivered through the <strong style={{ color: "#fff" }}>Vemisis</strong> app.
        </p>

        <div className="hero-ctas rv" style={{ ["--d" as string]: "620ms" }}>
          <Link href="/book" className="btn-primary btn-primary-lg">Book your free call <Arrow /></Link>
          <Link href="/how-it-works" className="btn-secondary btn-primary-lg">See the method</Link>
        </div>

      </div>

      <div className="hero-stage" ref={stageRef}>
        <motion.svg className="hero-ribbon" viewBox="0 0 1600 700" preserveAspectRatio="none" aria-hidden="true" style={{ rotate: ribbonRot }}>
          <defs>
            <linearGradient id="rb" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFDE02" stopOpacity="0" />
              <stop offset="18%" stopColor="#FFDE02" />
              <stop offset="55%" stopColor="#FFC400" />
              <stop offset="100%" stopColor="#FFE85C" />
            </linearGradient>
            <linearGradient id="rbh" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="rb-main" d="M-40 560 C 260 640, 520 520, 760 380 S 1240 120, 1660 170" stroke="url(#rb)" strokeWidth="118" fill="none" strokeLinecap="round" />
          <path className="rb-shine" d="M-40 530 C 260 610, 520 490, 760 350 S 1240 90, 1660 140" stroke="url(#rbh)" strokeWidth="6" fill="none" strokeLinecap="round" />
        </motion.svg>

        <motion.div className="hero-coach" style={{ y: yCoach }}>
          <div className="hero-coach-in">
          <Image
            src="/media/coach/cut-040.webp"
            alt="Guhayavarman, founder and head coach of CALIBRATE"
            width={760}
            height={1400}
            preload
            sizes="(max-width: 768px) 80vw, 520px"
            style={{ width: "100%", height: "auto" }}
          />
          </div>
        </motion.div>

        <motion.div className="hero-phone hero-phone-l" style={{ y: yLeft, rotate: -7 }}>
          <Device src="/media/app/home.webp" alt="Vemisis app home screen showing today's session and daily logs" width="100%" preload sizes="260px" />
        </motion.div>
        <motion.div className="hero-phone hero-phone-r" style={{ y: yRight, rotate: 7 }}>
          <Device src="/media/app/insights.webp" alt="Vemisis Insights screen with an overall score of 62" width="100%" sizes="260px" />
        </motion.div>

        <div className="hero-fade" aria-hidden="true" />
      </div>

      <style>{`
        .hero { position: relative; padding-top: 140px; overflow: hidden; isolation: isolate; }
        .hero-bg { position: absolute; inset: 0; z-index: -2; }
        .hero-glow {
          position: absolute; z-index: -1; left: 50%; top: 40%; transform: translateX(-50%);
          width: 1200px; height: 900px; border-radius: 50%;
          background: radial-gradient(closest-side, rgba(255,222,2,0.13), rgba(255,222,2,0.03) 60%, transparent);
          pointer-events: none;
        }
        .hero-copy { display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; z-index: 3; }
        .hero-title {
          font-size: clamp(52px, 8.6vw, 136px);
          line-height: 0.92;
          display: flex; flex-direction: column; align-items: center;
          max-width: 100%;
        }
        .hero-line { position: relative; display: block; }
        .hero-sticker {
          position: absolute; top: -14px; right: -132px;
          font-size: 15px;
          animation: sticker-in 0.9s var(--ease-out) 0.9s both;
        }
        @keyframes sticker-in { from { opacity: 0; transform: rotate(-24deg) scale(0.4); } to { opacity: 1; transform: rotate(-6deg) scale(1); } }
        .hero-lead { max-width: 680px; margin-top: 30px; text-wrap: pretty; }
        .hero-ctas { display: flex; gap: 12px; margin-top: 34px; flex-wrap: wrap; justify-content: center; }

        .hero-stage { position: relative; height: 700px; max-width: 1320px; margin: 24px auto 0; }
        .hero-ribbon { position: absolute; left: -10%; right: -10%; width: 120%; top: 40px; height: 600px; z-index: 0; overflow: visible; }
        .rb-main { stroke-dasharray: 2400; stroke-dashoffset: 2400; animation: rb-draw 2.2s var(--ease-out) 0.5s forwards; }
        .rb-shine { stroke-dasharray: 2400; stroke-dashoffset: 2400; animation: rb-draw 2.4s var(--ease-out) 0.9s forwards; }
        @keyframes rb-draw { to { stroke-dashoffset: 0; } }

        .hero-coach {
          position: absolute; left: 50%; bottom: -40px; width: 470px; margin-left: -235px; z-index: 2;
          filter: drop-shadow(0 30px 60px rgba(0,0,0,0.6));
        }
        .hero-coach-in { animation: fade-up 1.1s var(--ease-out) 0.35s both; }
        .hero-phone { position: absolute; width: 228px; z-index: 3; }
        .hero-phone-l { left: 9%; top: 110px; animation: phone-in-l 1.2s var(--ease-out) 0.6s both; }
        .hero-phone-r { right: 9%; top: 150px; animation: phone-in-r 1.2s var(--ease-out) 0.75s both; }
        @keyframes phone-in-l { from { opacity: 0; translate: -60px 80px; } to { opacity: 1; translate: 0 0; } }
        @keyframes phone-in-r { from { opacity: 0; translate: 60px 80px; } to { opacity: 1; translate: 0 0; } }


        .hero-fade { position: absolute; left: -20%; right: -20%; bottom: -1px; height: 170px; background: linear-gradient(transparent, var(--bg-base) 88%); z-index: 4; pointer-events: none; }

        @media (max-width: 1180px) {
          .hero-sticker { right: -40px; top: -48px; }
          .hero-phone { width: 200px; }
          .hero-phone-l { left: 3%; }
          .hero-phone-r { right: 3%; }
        }
        @media (max-width: 860px) {
          .hero { padding-top: 116px; }
          .hero-sticker { position: relative; top: auto; right: auto; display: inline-flex; margin: 0 auto 18px; font-size: 13px; order: -1; }
          .hero-line:first-child { display: flex; flex-direction: column; align-items: center; }
          .hero-stage { height: 560px; margin-top: 8px; }
          .hero-coach { width: 330px; margin-left: -165px; bottom: -20px; }
          .hero-phone { width: 150px; }
          .hero-phone-l { left: 2%; top: 150px; }
          .hero-phone-r { right: 2%; top: 190px; }
          .hero-ribbon { top: 170px; height: 300px; }
        }
        @media (max-width: 480px) {
          .hero-stage { height: 470px; }
          .hero-ribbon { top: 150px; height: 240px; }
          .hero-coach { width: 280px; margin-left: -140px; }
          .hero-phone { width: 118px; }
          .hero-phone-l { top: 170px; left: -2%; }
          .hero-phone-r { top: 200px; right: -2%; }
        }
      `}</style>
    </section>
  );
}
