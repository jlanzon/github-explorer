import { useEffect, useState, useCallback } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BsFillCloudyFill, BsStarFill } from "react-icons/bs";

// Lots of borrowed code from my portfolio site 😬 Please forgive me :)

function DarkModeToggle({ mode, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={`relative p-1 w-16 rounded-full flex shadow-md bg-gradient-to-b ${
        mode === "light"
          ? "justify-end from-blue-500 to-sky-300"
          : "justify-start from-indigo-600 to-indigo-400"
      }`}
      aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
    >
      <Thumb mode={mode} />
      {mode === "light" ? <Clouds /> : <Stars />}
    </button>
  );
}

function Thumb({ mode }) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.6, type: "spring" }}
      className="h-6 w-6 rounded-full overflow-hidden shadow-md relative"
    >
      <div
        className={`absolute inset-0 ${
          mode === "dark"
            ? "bg-slate-100"
            : "animate-pulse bg-gradient-to-tr from-amber-300 to-yellow-500 rounded-full"
        }`}
      />
      {mode === "light" ? <SunCenter /> : <MoonSpots />}
    </motion.div>
  );
}

function SunCenter() {
  return <div className="absolute inset-1 rounded-full bg-amber-300" />;
}

function MoonSpots() {
  return (
    <>
      <motion.div
        initial={{ x: -2, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.3 }}
        className="w-2 h-2 rounded-full bg-slate-300 absolute right-1.5 bottom-0.5"
      />
      <motion.div
        initial={{ x: -2, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.3 }}
        className="w-2 h-2 rounded-full bg-slate-300 absolute left-0.5 bottom-2"
      />
      <motion.div
        initial={{ x: -2, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.24, duration: 0.3 }}
        className="w-1 h-1 rounded-full bg-slate-300 absolute right-1 top-1"
      />
    </>
  );
}

function Stars() {
  return (
    <>
      <motion.span
        animate={{ scale: [0.75, 1, 0.75], opacity: [0.75, 1, 0.75] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="text-slate-300 text-[8px] absolute right-4 top-1"
      >
        <BsStarFill />
      </motion.span>
      <motion.span
        animate={{ scale: [1, 0.75, 1], opacity: [0.5, 0.25, 0.5] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        style={{ rotate: "-45deg" }}
        className="text-slate-300 text-xs absolute right-2 top-2"
      >
        <BsStarFill />
      </motion.span>
    </>
  );
}

function Clouds() {
  return (
    <>
      <motion.span
        animate={{ x: [-10, -5, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 0.25 }}
        className="text-white text-[8px] absolute left-4 top-1"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-5, 0, 5], opacity: [0, 1, 0] }}
        transition={{ duration: 20, repeat: Infinity, delay: 0.5 }}
        className="text-white text-xs absolute left-2 top-2"
      >
        <BsFillCloudyFill />
      </motion.span>
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((m) => (m === "light" ? "dark" : "light"));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
      <a href="#content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold">
            GitHub Explorer
          </Link>
          <nav className="text-sm opacity-80">{pathname}</nav>
          <DarkModeToggle mode={mode} toggleTheme={toggleTheme} />
        </div>
      </header>
      <main id="content" className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}