import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400;1,700&family=Montserrat:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background: #0a0a08;
    scroll-behavior: smooth;
  }

  :root {
    --gold: #c8952a;
    --gold-light: #e8b84b;
    --white: #f5f0e8;
    --black: #0a0a08;
    --dark: #111109;
  }

  .portfolio-root {
    font-family: 'Montserrat', sans-serif;
    background: var(--black);
    color: var(--white);
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  /* Subtle geometric background */
  .portfolio-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 55% 50%, rgba(30,25,10,0.9) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 50% 50%, rgba(200,149,42,0.04) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  /* K diamond shape */
  .k-diamond {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45%) rotate(45deg);
    width: 420px;
    height: 420px;
    background: linear-gradient(135deg, rgba(200,149,42,0.06) 0%, rgba(255,255,255,0.02) 50%, transparent 100%);
    border: 1px solid rgba(200,149,42,0.08);
    z-index: 0;
    animation: diamondPulse 6s ease-in-out infinite;
  }

  @keyframes diamondPulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -45%) rotate(45deg) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -45%) rotate(45deg) scale(1.03); }
  }

  /* NAV */
  .nav {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 48px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    animation: fadeDown 0.8s ease forwards;
    opacity: 0;
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 900;
    color: var(--white);
    letter-spacing: -0.5px;
    cursor: pointer;
    position: relative;
  }

  .nav-logo span {
    color: var(--gold);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 40px;
    list-style: none;
  }

  .nav-links a {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.6);
    text-decoration: none;
    transition: color 0.25s ease;
    cursor: pointer;
  }

  .nav-links a:hover { color: var(--white); }
  .nav-links a.active {
    color: var(--gold);
    position: relative;
  }
  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gold);
  }

  .nav-cta {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1.5px solid var(--gold);
    padding: 12px 24px;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease;
    background: transparent;
    font-family: 'Montserrat', sans-serif;
  }

  .nav-cta:hover {
    background: var(--gold);
    color: var(--black);
  }

  /* HERO */
  .hero {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 85px);
    text-align: center;
    padding: 0 24px;
  }

  .hero-eyebrow {
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 36px;
    opacity: 0;
    animation: fadeUp 0.7s ease 0.4s forwards;
  }

  .hero-title-wrap {
    overflow: hidden;
    margin-bottom: 0;
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(80px, 12vw, 160px);
    font-weight: 900;
    color: var(--white);
    line-height: 0.92;
    letter-spacing: -0.02em;
    display: block;
    opacity: 0;
    transform: translateY(60px);
    animation: slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards;
  }

  .hero-subtitle {
    font-size: clamp(18px, 2.5vw, 28px);
    font-weight: 300;
    color: rgba(245,240,232,0.75);
    margin-top: 20px;
    letter-spacing: 0.02em;
    opacity: 0;
    animation: fadeUp 0.7s ease 0.9s forwards;
  }

  .hero-subtitle em {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 700;
    color: var(--gold-light);
    font-size: 1.05em;
  }

  .hero-scroll {
    position: absolute;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.4);
    cursor: pointer;
    opacity: 0;
    animation: fadeUp 0.7s ease 1.3s forwards;
    transition: color 0.25s ease;
    white-space: nowrap;
  }

  .hero-scroll:hover { color: rgba(245,240,232,0.75); }

  .scroll-arrow {
    display: flex;
    flex-direction: column;
    gap: 3px;
    animation: bounce 2s ease-in-out 2s infinite;
  }

  .scroll-arrow span {
    display: block;
    width: 1px;
    height: 18px;
    background: currentColor;
    margin: 0 auto;
  }

  .scroll-arrow::after {
    content: '↓';
    font-size: 13px;
    line-height: 1;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(5px); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(60px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Grain overlay */
  .grain {
    position: fixed;
    inset: -50%;
    width: 200%;
    height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.028;
    pointer-events: none;
    z-index: 100;
    animation: grainShift 0.3s steps(1) infinite;
  }

  @keyframes grainShift {
    0% { transform: translate(0, 0); }
    20% { transform: translate(-3%, -4%); }
    40% { transform: translate(2%, 3%); }
    60% { transform: translate(-1%, 2%); }
    80% { transform: translate(3%, -2%); }
    100% { transform: translate(0, 0); }
  }

  /* Cursor dot */
  .cursor-dot {
    position: fixed;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gold);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, opacity 0.3s ease;
    mix-blend-mode: screen;
  }

  .cursor-ring {
    position: fixed;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(200,149,42,0.5);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.18s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  }

  /* Side line decorations */
  .side-line {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    opacity: 0;
    animation: fadeUp 0.6s ease 1.5s forwards;
  }

  .side-line.left { left: 40px; }
  .side-line.right { right: 40px; }

  .side-line-bar {
    width: 1px;
    height: 80px;
    background: linear-gradient(to bottom, transparent, rgba(200,149,42,0.4), transparent);
  }

  .side-line-text {
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.25);
    writing-mode: vertical-lr;
  }

  /* ── TICKER MARQUEE ── */
  .ticker {
    position: relative;
    z-index: 10;
    width: 100%;
    overflow: hidden;
    border-top: 1px solid rgba(200,149,42,0.3);
    border-bottom: 1px solid rgba(200,149,42,0.3);
    background: rgba(200,149,42,0.04);
    padding: 14px 0;
  }

  .ticker-track {
    display: flex;
    align-items: center;
    gap: 0;
    width: max-content;
    animation: marquee 28s linear infinite;
  }

  .ticker-track:hover { animation-play-state: paused; }

  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .ticker-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 32px;
    white-space: nowrap;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.55);
  }

  .ticker-diamond {
    width: 6px;
    height: 6px;
    background: var(--gold);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ── ABOUT SECTION ── */
  .about {
    position: relative;
    z-index: 5;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    padding: 120px 80px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .about-left {}

  .about-eyebrow {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 28px;
  }

  .about-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 5vw, 68px);
    font-weight: 900;
    line-height: 1.05;
    color: var(--white);
  }

  .about-title em {
    font-style: italic;
    font-weight: 700;
    color: var(--gold-light);
  }

  .about-right {}

  .about-body {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(245,240,232,0.72);
    margin-bottom: 24px;
  }

  .about-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 40px;
  }

  .about-tag {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: rgba(245,240,232,0.7);
    border: 1px solid rgba(245,240,232,0.18);
    padding: 9px 18px;
    transition: border-color 0.25s, color 0.25s;
    cursor: default;
  }

  .about-tag:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  /* Divider line */
  .section-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(200,149,42,0.25), transparent);
  }

  /* ── SKILLS SECTION ── */
  .skills {
    position: relative;
    z-index: 5;
    padding: 100px 80px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .skills-header {
    margin-bottom: 64px;
  }

  .skills-eyebrow {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
  }

  .skills-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 900;
    color: var(--white);
    line-height: 1;
  }

  .skills-list {
    list-style: none;
  }

  .skill-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 0 20px;
    border-bottom: 1px solid rgba(245,240,232,0.1);
    cursor: default;
    position: relative;
    overflow: hidden;
    transition: padding-left 0.3s ease;
  }

  .skill-row::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 1px;
    width: 0%;
    background: var(--gold);
    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .skill-row:hover::after { width: 85%; }
  .skill-row:hover { padding-left: 12px; }

  .skill-left {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .skill-num {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: rgba(200,149,42,0.6);
    min-width: 24px;
  }

  .skill-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 2.8vw, 32px);
    font-weight: 700;
    color: var(--white);
    transition: color 0.25s ease;
  }

  .skill-row:hover .skill-name { color: var(--white); }

  .skill-tools {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: rgba(245,240,232,0.35);
    transition: color 0.25s ease;
  }

  .skill-row:hover .skill-tools { color: rgba(245,240,232,0.6); }

  .project-img-hover-label {
    position: absolute;
    bottom: 16px;
    left: 16px;
    z-index: 2;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--white);
    background: rgba(200,149,42,0.85);
    padding: 7px 14px;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .project-card:hover .project-img-hover-label {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── PROJECTS SECTION ── */
  .projects {
    position: relative;
    z-index: 5;
    padding: 100px 80px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .projects-header {
    margin-bottom: 56px;
  }

  .projects-eyebrow {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
  }

  .projects-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 900;
    color: var(--white);
    line-height: 1;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .project-card {
    display: block;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .project-img-wrap {
    width: 100%;
    aspect-ratio: 16/10;
    overflow: hidden;
    position: relative;
    background: #1a1a16;
  }

  .project-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
    filter: brightness(0.88) saturate(0.85);
  }

  .project-card:hover .project-img-wrap img {
    transform: scale(1.05);
    filter: brightness(1) saturate(1);
  }

  .project-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,10,8,0.5) 0%, transparent 60%);
    z-index: 1;
  }

  .project-arrow {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 2;
    width: 40px;
    height: 40px;
    background: rgba(200,149,42,0.0);
    border: 1px solid rgba(200,149,42,0);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--gold);
    opacity: 0;
    transform: translate(6px, -6px);
    transition: opacity 0.3s ease, transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  }

  .project-card:hover .project-arrow {
    opacity: 1;
    transform: translate(0, 0);
    background: rgba(200,149,42,0.15);
    border-color: rgba(200,149,42,0.5);
  }

  .project-meta {
    padding: 20px 0 0;
  }

  .project-meta-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .project-tag {
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .project-year {
    font-size: 11px;
    font-weight: 400;
    color: rgba(245,240,232,0.35);
    letter-spacing: 0.05em;
  }

  .project-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px, 2.5vw, 34px);
    font-weight: 700;
    color: var(--white);
    line-height: 1.1;
    transition: color 0.25s ease;
  }

  .project-card:hover .project-name { color: var(--gold-light); }

  .project-desc {
    font-size: 13px;
    font-weight: 300;
    color: rgba(245,240,232,0.45);
    margin-top: 8px;
    line-height: 1.6;
  }

  /* ── CONTACT SECTION ── */
  .contact {
    position: relative;
    z-index: 5;
    text-align: center;
    padding: 120px 48px 100px;
    border-top: 1px solid rgba(245,240,232,0.07);
  }

  .contact-eyebrow {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 36px;
  }

  .contact-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(48px, 8vw, 110px);
    font-weight: 900;
    color: var(--white);
    line-height: 1.0;
    margin-bottom: 36px;
  }

  .contact-title em {
    font-style: italic;
    color: var(--gold-light);
  }

  .contact-sub {
    font-size: 16px;
    font-weight: 300;
    color: rgba(245,240,232,0.55);
    max-width: 520px;
    margin: 0 auto 56px;
    line-height: 1.7;
  }

  .contact-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
  }

  .contact-btn-primary {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1.5px solid var(--gold);
    padding: 18px 48px;
    background: transparent;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease;
    text-decoration: none;
    display: inline-block;
  }

  .contact-btn-primary:hover {
    background: var(--gold);
    color: var(--black);
  }

  .contact-btn-ghost {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.5);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.25s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }

  .contact-btn-ghost:hover { color: var(--white); }

  /* ── CONTACT FORM MODAL ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(6px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .modal {
    background: #111109;
    border: 1px solid rgba(200,149,42,0.2);
    width: 100%;
    max-width: 560px;
    padding: 48px;
    position: relative;
    animation: slideUp2 0.35s cubic-bezier(0.16,1,0.3,1);
  }

  @keyframes slideUp2 {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .modal-close {
    position: absolute;
    top: 18px;
    right: 20px;
    background: none;
    border: none;
    color: rgba(245,240,232,0.4);
    font-size: 22px;
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s;
    font-family: 'Montserrat', sans-serif;
  }
  .modal-close:hover { color: var(--white); }

  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 900;
    color: var(--white);
    margin-bottom: 6px;
  }

  .modal-sub {
    font-size: 12px;
    color: rgba(245,240,232,0.4);
    margin-bottom: 36px;
    letter-spacing: 0.04em;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.5);
    margin-bottom: 8px;
  }

  .form-input, .form-textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(245,240,232,0.12);
    color: var(--white);
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 300;
    padding: 14px 16px;
    outline: none;
    transition: border-color 0.25s;
    resize: none;
  }

  .form-input:focus, .form-textarea:focus {
    border-color: var(--gold);
  }

  .form-input::placeholder, .form-textarea::placeholder {
    color: rgba(245,240,232,0.2);
  }

  .form-textarea { height: 120px; }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .form-submit {
    width: 100%;
    margin-top: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--black);
    background: var(--gold);
    border: none;
    padding: 18px;
    cursor: pointer;
    transition: background 0.25s, opacity 0.25s;
  }

  .form-submit:hover { background: var(--gold-light); }
  .form-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .form-status {
    margin-top: 14px;
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.05em;
  }
  .form-status.success { color: #6fcf97; }
  .form-status.error   { color: #eb5757; }


  /* ── FOOTER ── */
  .footer {
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    padding: 32px 48px;
    border-top: 1px solid rgba(245,240,232,0.07);
    background: rgba(0,0,0,0.3);
    flex-wrap: wrap;
  }

  .footer-link {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.35);
    text-decoration: none;
    transition: color 0.25s ease;
  }

  .footer-link:hover { color: var(--gold); }

  .footer-sep {
    width: 1px;
    height: 14px;
    background: rgba(245,240,232,0.12);
  }
`;

export default function PortfolioHero() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"sending" | "success" | "error-fields" | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleFormSubmit = () => {
    const { name, email, subject, message } = form;
    if (!name || !email || !message) { setFormStatus("error-fields"); return; }
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:mutimutujehope90@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Contact")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setFormStatus("success");
    setTimeout(() => { setShowModal(false); setFormStatus(null); setForm({ name:"", email:"", subject:"", message:"" }); }, 2500);
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorDot.current) {
        cursorDot.current.style.left = e.clientX + "px";
        cursorDot.current.style.top = e.clientY + "px";
      }
      if (cursorRing.current) {
        cursorRing.current.style.left = e.clientX + "px";
        cursorRing.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const sections = ["hero", "projects", "about", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id: string) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{style}</style>
      <div className="portfolio-root" style={{width:"100%", minHeight:"100vh"}}>
        <div className="grain" />
        <div ref={cursorDot} className="cursor-dot" />
        <div ref={cursorRing} className="cursor-ring" />

        {/* Background diamond */}
        <div className="k-diamond" />

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo" onClick={() => scrollTo("hero")} style={{cursor:"pointer"}}>K<span>.</span></div>
          <ul className="nav-links">
            {[
              { label: "Work",    id: "projects" },
              { label: "About",   id: "about"    },
              { label: "Skills",  id: "skills"   },
              { label: "Contact", id: "contact"  },
            ].map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeSection === id ? "active" : ""}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button className="nav-cta" onClick={() => scrollTo("contact")}>Let's Talk</button>
        </nav>

        {/* HERO */}
        <section id="hero" className="hero">
          {/* Side decorations */}
          <div className="side-line left">
            <div className="side-line-bar" />
            <span className="side-line-text">Portfolio</span>
            <div className="side-line-bar" />
          </div>
          <div className="side-line right">
            <div className="side-line-bar" />
            <span className="side-line-text">2025</span>
            <div className="side-line-bar" />
          </div>

          <p className="hero-eyebrow">Creative Developer</p>

          <div className="hero-title-wrap">
            <span className="hero-title">CRAFTING</span>
          </div>

          <p className="hero-subtitle">
            I build&nbsp;&nbsp;<em>Digital Experiences</em>
          </p>

          <div className="hero-scroll">
            Scroll to explore &nbsp;
            <div className="scroll-arrow" />
          </div>
        </section>

        {/* TICKER */}
        {(() => {
          const items = ["UX Design", "Web Development", "Motion Design", "Brand Identity", "Creative Development", "3D & WebGL", "Interactive UI", "Frontend Architecture"];
          const doubled = [...items, ...items];
          return (
            <div className="ticker">
              <div className="ticker-track">
                {doubled.map((item, i) => (
                  <div className="ticker-item" key={i}>
                    <span className="ticker-diamond" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        <div className="section-divider" style={{marginTop: "0"}} />

        {/* PROJECTS */}
        <section id="projects" className="projects">
          <div className="projects-header">
            <p className="projects-eyebrow">Selected Works</p>
            <h2 className="projects-title">Projects</h2>
          </div>
          <div className="projects-grid">
            {[
              {
                name: "Her-Access",
                tag: "Women Empowerment",
                year: "2025",
                desc: "A platform bridging the digital divide for women in underserved communities.",
                img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=85",
                url: "https://github.com/hope-dev90/her-access",
              },
              {
                name: "UbutaberaHub",
                tag: "Community Platform",
                year: "2025",
                desc: "A collaborative hub connecting local communities through shared resources.",
                img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=85",
                url: "https://github.com/hope-dev90/ubutaberahub",
              },
              {
                name: "Her-Legacy",
                tag: "Social Impact",
                year: "2025",
                desc: "Preserving and celebrating the stories and achievements of women leaders.",
                img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=85",
                url: "https://github.com/hope-dev90/her-legacy",
              },
              {
                name: "Personal Agenda",
                tag: "Productivity",
                year: "2025",
                desc: "A smart personal planning tool with AI-powered scheduling and task management.",
                img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=900&q=85",
                url: "https://github.com/hope-dev90/personal-agenda",
              },
            ].map(({ name, tag, year, desc, img, url }) => (
              <a className="project-card" key={name} href={url} target="_blank" rel="noreferrer">
                <div className="project-img-wrap">
                  <img src={img} alt={name} />
                  <div className="project-img-overlay" />
                  <div className="project-arrow">↗</div>
                  <div className="project-img-hover-label">View Project</div>
                </div>
                <div className="project-meta">
                  <div className="project-meta-top">
                    <span className="project-tag">{tag}</span>
                    <span className="project-year">{year}</span>
                  </div>
                  <div className="project-name">{name}</div>
                  <p className="project-desc">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* ABOUT */}
        <section id="about" className="about">
          <div className="about-left">
            <p className="about-eyebrow">About</p>
            <h2 className="about-title">
              Building the<br />
              <em>future</em> of web
            </h2>
          </div>
          <div className="about-right">
            <p className="about-body">
              I'm a creative developer passionate about building exceptional digital experiences that push the boundaries of what's possible on the web.
            </p>
            <p className="about-body">
              My approach combines Swiss design principles with cutting-edge technology to create work that's both beautiful and performant.
            </p>
            <div className="about-tags">
              {["React", "Next.js", "TypeScript", "Three.js", "Framer Motion", "Tailwind CSS"].map(tag => (
                <span className="about-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* SKILLS */}
        <section id="skills" className="skills">
          <div className="skills-header">
            <p className="skills-eyebrow">Expertise</p>
            <h2 className="skills-title">Skills</h2>
          </div>
          <ul className="skills-list">
            {[
              { num: "01", name: "Frontend Development", tools: "React, Next.js, Vue" },
              { num: "02", name: "UI/UX Design",         tools: "Figma, Framer, Adobe CC" },
              { num: "03", name: "Motion & Animation",   tools: "GSAP, Framer Motion, Three.js" },
              { num: "04", name: "Backend & APIs",       tools: "Node.js, Python, PostgreSQL" },
              { num: "05", name: "Cybersecurity",        tools: "Pen Testing, OWASP, Network Security" },
              { num: "06", name: "Express & Server",     tools: "Express.js, REST APIs, Middleware" },
            ].map(({ num, name, tools }) => (
              <li className="skill-row" key={num}>
                <div className="skill-left">
                  <span className="skill-num">{num}</span>
                  <span className="skill-name">{name}</span>
                </div>
                <span className="skill-tools">{tools}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="section-divider" />

        {/* CONTACT */}
        <section id="contact" className="contact">
          <p className="contact-eyebrow">Get In Touch</p>
          <h2 className="contact-title">
            Let's create<br />
            <em>something</em> great
          </h2>
          <p className="contact-sub">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="contact-actions">
            <button className="contact-btn-primary" onClick={() => setShowModal(true)}>
              Send A Message
            </button>
            <a className="contact-btn-ghost" href="https://github.com/hope-dev90" target="_blank" rel="noreferrer">
              Download CV ↓
            </a>
          </div>
        </section>

        {/* MESSAGE MODAL */}
        {showModal && (
          <div className="modal-overlay" onClick={(e: React.MouseEvent<HTMLDivElement>) => { if ((e.target as HTMLElement).classList.contains("modal-overlay")) setShowModal(false); }}>
            <div className="modal">
              <button className="modal-close" onClick={() => { setShowModal(false); setFormStatus(null); }}>✕</button>
              <h3 className="modal-title">Send a Message</h3>
              <p className="modal-sub">I'll get back to you at mutimutujehope90@gmail.com</p>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" name="name" value={form.name} onChange={handleFormChange} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Email</label>
                  <input className="form-input" name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="john@email.com" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" name="subject" value={form.subject} onChange={handleFormChange} placeholder="Project idea, collaboration..." />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" name="message" value={form.message} onChange={handleFormChange} placeholder="Tell me about your project..." />
              </div>

              <button className="form-submit" onClick={handleFormSubmit} disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "Sending..." : "Send Message →"}
              </button>

              {formStatus === "success" && (
                <p className="form-status success">✓ Opening your email client — message ready to send!</p>
              )}
              {formStatus === "error-fields" && (
                <p className="form-status error">Please fill in your name, email and message.</p>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <a className="footer-link" href="https://github.com/hope-dev90" target="_blank" rel="noreferrer">GitHub</a>
          <div className="footer-sep" />
          <a className="footer-link" href="mailto:mutimutujehope90@gmail.com">Email</a>
          <div className="footer-sep" />
          <a className="footer-link" href="https://instagram.com/hope250" target="_blank" rel="noreferrer">Instagram</a>
        </footer>

      </div>
    </>
  );
}