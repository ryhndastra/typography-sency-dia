/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LYRICS, Lyric, ViewMode } from "../app/data/lyrics";
import { Play, Instagram, Heart, MessageCircle, Send } from "lucide-react";
// --- KONFIGURASI ---
const INSTRUMENTAL_DELAY_S = 8.0; 
const LYRIC_Z_SPACING = 2500; 
const PERSPECTIVE_ORIGIN = "50% 50%";

// --- GLOBAL STYLES ---
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&family=Permanent+Marker&family=Bebas+Neue&family=VT323&family=Anton&display=swap');
  
  body { overflow: hidden; font-family: 'Inter', sans-serif; background: #050505; }
  .preserve-3d { transform-style: preserve-3d; }
  
  /* HIGH END GRAIN TEXTURE */
  .noise-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-image: url("https://grainy-gradients.vercel.app/noise.svg");
    opacity: 0.08;
    filter: contrast(150%) brightness(100%);
    pointer-events: none; z-index: 90;
  }
  
  /* CINEMATIC VIGNETTE */
  .vignette-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%);
    pointer-events: none; z-index: 80;
  }
`;

const TUNNEL_POSITIONS = LYRICS.map((_, i) => {
    const radius = 350; 
    const angle = i * 0.8; 
    return {
        x: Math.cos(angle) * radius, 
        y: Math.sin(angle) * radius * 0.6, 
        z: i * LYRIC_Z_SPACING, 
        rotateZ: (i % 2 === 0 ? 5 : -5) 
    };
});

const TypingCaption = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    setDisplayedText(""); 
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 40); 
    return () => clearInterval(intervalId);
  }, [text]);
  return <span>{displayedText}</span>;
};


const DynamicBackground = ({ view }: { view: ViewMode }) => {
    let bgState = "dark"; 
    if (view === "humming-party") bgState = "white"; 
    if (view === "flash-bang") bgState = "flash"; 
    if (view === "impact-punch") bgState = "dim";
    if (view === "rooftop-rise") bgState = "rooftop";
    if (view && view.includes("checklist")) bgState = "yellow"; 
    if (view === "rage-scream") bgState = "blood-flash"; 
    if (view === "elegant-wave") bgState = "pastel"; 

    const getBgColor = () => {
        if (bgState === "white") return "#ffffff";
        if (bgState === "flash") return ["#ffffff", "#050505"];
        if (bgState === "dim") return "#1a1a1a";
        if (bgState === "rooftop") return ["#000000", "#0a0a2a"];
        if (bgState === "yellow") return "#FFD700"; 
        if (bgState === "blood-flash") return ["#000000", "#550000"]; 
        if (bgState === "pastel") return "#0f0f0f"; 
        return "#050505";
    };

    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            <motion.div 
                className="absolute inset-0"
                animate={{ 
                    backgroundColor: typeof getBgColor() === 'string' ? getBgColor() : undefined,
                    background: Array.isArray(getBgColor()) && bgState === "rooftop" 
                        ? "linear-gradient(to top, #0f0c29, #302b63, #24243e)" 
                        : undefined
                }}
                transition={{ 
                    duration: bgState === "blood-flash" ? 0.1 : 0.8,
                    repeat: bgState === "blood-flash" ? Infinity : 0,
                    ease: "easeInOut" 
                }}
            />

            {(bgState === "dark" || bgState === "dim" || bgState === "pastel") && (
                <motion.div 
                    className="absolute w-200 h-200 rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)",
                        filter: "blur(60px)",
                    }}
                    animate={{ 
                        x: ["-20%", "50%", "20%", "-20%"],
                        y: ["-20%", "20%", "50%", "-20%"],
                        scale: [1, 1.3, 0.8, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            )}

            {bgState === "rooftop" && (
                <>
                     {/* Bintang */}
                     <motion.div 
                         initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
                         className="absolute inset-0 w-full h-full"
                         style={{
                             backgroundImage: 'radial-gradient(white, rgba(255,255,255,.1) 1px, transparent 1px)',
                             backgroundSize: '50px 50px'
                         }}
                     />
                     
                     <div className="absolute bottom-0 left-0 w-full h-[30vh] z-10 flex items-end">
                        <div 
                            className="w-full h-full bg-[#050510]"
                            style={{
                                clipPath: "polygon(0% 100%, 0% 70%, 5% 70%, 5% 40%, 10% 40%, 10% 60%, 15% 60%, 15% 30%, 20% 30%, 20% 65%, 25% 65%, 25% 45%, 30% 45%, 30% 80%, 35% 80%, 35% 35%, 40% 35%, 40% 60%, 45% 60%, 45% 25%, 50% 25%, 50% 55%, 55% 55%, 55% 40%, 60% 40%, 60% 75%, 65% 75%, 65% 30%, 70% 30%, 70% 60%, 75% 60%, 75% 45%, 80% 45%, 80% 80%, 85% 80%, 85% 50%, 90% 50%, 90% 70%, 95% 70%, 95% 40%, 100% 40%, 100% 100%)"
                            }}
                        >
                            <div className="w-full h-full opacity-30" 
                                style={{
                                    backgroundImage: "linear-gradient(rgba(255, 255, 0, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(255, 255, 0, 0.5) 2px, transparent 2px)",
                                    backgroundSize: "20px 30px",
                                    backgroundPosition: "5px 5px"
                                }}
                            />
                        </div>
                     </div>
                </>
            )}
        </div>
    )
}

const LoadingScreen = ({ progress }: { progress: number }) => (
    <motion.div className="fixed inset-0 z-100 bg-black flex flex-col items-center justify-center text-white"
        exit={{ opacity: 0, transition: { duration: 0.5 } }}>
        <h1 className="font-black text-6xl mb-8 tracking-widest">SENCY - DIA</h1>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div className="h-full bg-white" initial={{ width: "0%" }} animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ ease: "linear", duration: 0.1 }} />
        </div>
    </motion.div>
);


const SceneRageScream = ({ text }: { text: string }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-50 overflow-hidden mix-blend-hard-light">
             <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                    scale: [1, 1.5, 1.2, 1.4], 
                    x: [0, -20, 20, -15, 15, 0], 
                    y: [0, 15, -15, 10, -10, 0],
                    rotateZ: [0, -5, 5, -3, 3, 0],
                    opacity: 1
                }}
                transition={{ 
                    duration: 0.3, 
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
                className="text-center"
             >
                <h1 className="font-black text-red-600 uppercase leading-none tracking-tighter"
                   style={{ 
                       fontFamily: 'Anton, sans-serif', 
                       fontSize: 'clamp(5rem, 20vw, 12rem)', 
                       textShadow: '10px 10px 0px #000, -5px -5px 0px #fff' 
                   }}
               >
                   {text}
               </h1>
             </motion.div>
        </div>
    );
}

const SceneElegantWave = ({ text }: { text: string }) => {
    const letters = text.split("");
    return (
        <div className="absolute inset-0 flex items-center justify-center z-30">
            <motion.div className="flex flex-wrap justify-center gap-0.5">
                {letters.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 50, opacity: 0, scale: 0.8 }}
                        animate={{ 
                            y: [0, -15, 0], 
                            opacity: 1, 
                            scale: 1 
                        }}
                        transition={{ 
                            y: { 
                                delay: i * 0.05, 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            },
                            opacity: { duration: 0.5, delay: i * 0.03 }
                        }}
                        className="font-black uppercase leading-none tracking-tighter inline-block"
                        style={{ 
                            fontFamily: 'Bebas Neue', 
                            fontSize: 'clamp(5rem, 18vw, 12rem)',
                            backgroundImage: "linear-gradient(to bottom, #fff, #999)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0 10px 30px rgba(255,255,255,0.2)"
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    )
}

const SceneTunnelSafe = ({ lyrics, currentIndex }: { lyrics: Lyric[], currentIndex: number }) => {
    const activeIndex = Math.max(0, currentIndex);
    const targetPos = TUNNEL_POSITIONS[activeIndex];
    return (
        <motion.div className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-none z-0"
            exit={{ opacity: 0, scale: 2, filter: "blur(20px)", transition: { duration: 0.5 } }}>
            <div className="fixed inset-0 z-10 bg-[radial-gradient(circle,transparent_30%,#000000)] pointer-events-none" />
            
            <motion.div 
                className="absolute inset-0 w-full h-full flex items-center justify-center preserve-3d"
                animate={{ 
                    rotateZ: [-2, 2, -2], 
                    y: [-20, 20, -20],    
                    x: [-10, 10, -10]     
                }}
                transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            >
                <motion.div className="relative w-full h-full flex items-center justify-center preserve-3d"
                    animate={{ x: -targetPos.x, y: -targetPos.y, z: -targetPos.z - 500, rotateZ: -targetPos.rotateZ * 0.5 }}
                    transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.5 }}>
                    {lyrics.slice(0, 30).map((lyric, index) => {
                        const distance = index - activeIndex;
                        if (distance < -1 || distance > 5) return null;
                        if (lyric.view !== 'floating' && lyric.view !== 'tunnel-intro') return null;
                        if (lyric.text.includes("HUMMING")) return null;
                        const pos = TUNNEL_POSITIONS[index];
                        const isActive = index === activeIndex;
                        return (
                            <motion.div key={`tunnel-${index}`} className="absolute flex items-center justify-center w-screen max-w-250 text-center preserve-3d origin-center"
                                style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) rotateZ(${pos.rotateZ}deg)` }}>
                                <motion.h1 animate={{ opacity: isActive ? 1 : Math.max(0, 0.3 - (distance * 0.1)), filter: isActive ? "blur(0px)" : `blur(${Math.abs(distance) * 8}px)`, color: isActive ? "#ffffff" : "#444444", scale: isActive ? 1.2 : 1 }}
                                    transition={{ duration: 0.5 }} className="font-black leading-none uppercase tracking-tighter" style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(4rem, 9vw, 8rem)' }}>
                                    {lyric.text}
                                </motion.h1>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const SceneChecklistCustom = ({ text, type }: { text: string, type: 1 | 2 | 3 }) => {
    const [phase, setPhase] = useState(0); 
    const mainText = text.split(",")[0]; 
    const words = mainText.split(" "); 
    const word1 = words[0]; 
    const word2 = words[1]; 

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 500); 
        const t2 = setTimeout(() => setPhase(2), 1000); 
        return () => { clearTimeout(t1); clearTimeout(t2); }
    }, []);

    if (type === 1) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-yellow-400">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: phase === 2 ? -150 : 0 }} transition={{ duration: 0.4 }} className="mb-2">
                    <h1 className="font-black text-black text-8xl font-['Bebas_Neue'] tracking-wider">{phase >= 0 && <TypingCaption text={word1} />}</h1>
                </motion.div>
                {phase === 2 && (
                    <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1.5, rotate: 0 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="absolute z-50 bg-black text-white px-8 py-2 transform -rotate-6 shadow-[10px_10px_0px_rgba(0,0,0,0.2)]">
                        <h1 className="text-9xl font-black font-['Permanent_Marker']">CEK!</h1>
                    </motion.div>
                )}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: phase >= 1 ? 1 : 0, y: phase === 2 ? 150 : 0 }} transition={{ duration: 0.4 }} className="mt-2">
                    <h1 className="font-black text-black text-8xl font-['Bebas_Neue'] tracking-wider">{phase >= 1 && <TypingCaption text={word2} />}</h1>
                </motion.div>
            </div>
        )
    }
    if (type === 2) {
        return (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif')] bg-cover mix-blend-screen pointer-events-none"/>
                 <div className="flex flex-col items-center gap-8 z-10">
                    <div className="flex gap-12">
                        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="font-['VT323'] text-green-500 text-9xl tracking-widest">{word1}</motion.h1>
                        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-['VT323'] text-green-500 text-9xl tracking-widest">{word2}</motion.h1>
                    </div>
                    {phase === 2 && (
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="bg-green-500 text-black px-12 py-4">
                            <h1 className="text-8xl font-black font-['VT323']">✅ CONFIRMED</h1>
                        </motion.div>
                    )}
                 </div>
            </div>
        )
    }
    if (type === 3) {
        return (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-pink-200">
                <div className="flex items-center gap-4">
                    <motion.h1 initial={{ x: -500 }} animate={{ x: 0 }} transition={{ type: "spring" }} className="text-8xl font-black text-pink-600">{word1}</motion.h1>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}><Heart size={100} fill="#ec4899" className="text-pink-600" /></motion.div>
                    <motion.h1 initial={{ x: 500 }} animate={{ x: 0 }} transition={{ type: "spring" }} className="text-8xl font-black text-pink-600">{word2}</motion.h1>
                </div>
                {phase === 2 && (
                    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 50 }} className="absolute bottom-1/4">
                        <h1 className="text-9xl font-['Permanent_Marker'] text-white stroke-black" style={{ WebkitTextStroke: "4px black" }}>CEK!</h1>
                    </motion.div>
                )}
            </div>
        )
    }
    return null;
}

const SceneTypingChase = ({ text }: { text: string }) => {
    const letters = text.split("");
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-20">
            <motion.div className="flex items-center whitespace-nowrap"
                initial={{ x: "15%", scale: 1.3 }} animate={{ x: "-15%", scale: 1 }} transition={{ duration: 2.5, ease: "easeOut" }}>
                {letters.map((char, index) => (
                    <motion.span key={index} initial={{ opacity: 0, scale: 0, width: 0 }} animate={{ opacity: 1, scale: 1, width: "auto" }}
                        transition={{ delay: index * 0.06, type: "spring", stiffness: 400 }}
                        className="font-black text-white uppercase leading-none tracking-tighter inline-block"
                        style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(5rem, 18vw, 12rem)', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    )
}

const SceneRooftop = ({ text }: { text: string }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none perspective-distant">
            <motion.div initial={{ y: "100vh", rotateX: 60, opacity: 0, scale: 0.8 }} animate={{ y: 0, rotateX: 0, opacity: 1, scale: 1 }} exit={{ y: "-50vh", opacity: 0, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, opacity: { duration: 0.5 } }} className="preserve-3d text-center origin-bottom">
                <h1 className="font-black text-white uppercase leading-none tracking-tighter" style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(5rem, 15vw, 12rem)', textShadow: '0 0 40px rgba(255,255,255,0.4), 0 0 10px rgba(255,255,255,0.8)' }}>
                   {text}
               </h1>
            </motion.div>
        </div>
    );
};

const SceneCinematicMotion = ({ text, view }: { text: string, view: ViewMode }) => {
    const isImpact = view === "impact-punch" || view === "flash-bang";
    if (isImpact) {
        return (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none perspective-distant">
                <motion.div initial={{ opacity: 0, scale: 2, filter: "blur(20px)", rotateZ: 0 }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotateZ: [0, -3, 3, 0] }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ scale: { type: "spring", stiffness: 300, damping: 20 }, opacity: { duration: 0.1 }, filter: { duration: 0.3 }, rotateZ: { duration: 0.3, ease: "linear" } }} className="preserve-3d text-center origin-center">
                     <h1 className="font-black text-white uppercase leading-none tracking-tighter" style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(5rem, 15vw, 13rem)', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>{text}</h1>
                </motion.div>
            </div>
        );
    } else {
        return (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none perspective-distant">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1, x: [0, 5, -5, 2, -2, 0], y: [0, -3, 3, -1, 1, 0], rotateZ: [0, 1, -1, 0] }} exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                    transition={{ scale: { duration: 1.5, ease: "easeOut" }, opacity: { duration: 0.3 }, x: { duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }, y: { duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }, rotateZ: { duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }}
                    className="preserve-3d text-center origin-center max-w-[90vw]">
                     <h1 className="font-black text-white uppercase leading-none tracking-tighter" style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(4rem, 12vw, 9rem)', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>{text}</h1>
                </motion.div>
            </div>
        );
    }
};

const SceneHummingParty = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://tenor.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return () => { try { document.body.removeChild(script); } catch (e) {} }
    }, []);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
            <motion.div className="relative z-10 w-full max-w-6xl p-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center" animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }}><div className="tenor-gif-embed" data-postid="11751057092953647922" data-share-method="host" data-aspect-ratio="0.666667" data-width="100%"></div></motion.div>
                <motion.div initial={{ scale: 0, y: 50 }} animate={{ scale: 1.2, y: 0 }} transition={{ type: "spring", delay: 0.1 }}><div className="tenor-gif-embed" data-postid="13376873318217365775" data-share-method="host" data-aspect-ratio="1.33155" data-width="100%"></div></motion.div>
                <motion.div initial={{ scale: 0, rotate: 10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.2 }}><div className="tenor-gif-embed" data-postid="8604403485823317611" data-share-method="host" data-aspect-ratio="0.933735" data-width="100%"></div></motion.div>
            </motion.div>
        </div>
    );
}

const ScenePhonePersistent = ({ currentLyric, allLyrics, currentTime }: any) => {
  const chatHistory = allLyrics.filter((l: any) => l.view === 'phone-chat' && l.time <= currentTime + 0.1);
  const isLastChatHer = currentLyric.sender === 'her';
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none preserve-3d"
       initial={{ y: 800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 800, opacity: 0 }} transition={{ type: "spring", damping: 20 }}>
      <motion.div className="preserve-3d" animate={{ z: 250, y: -100, rotateY: isLastChatHer ? -5 : 5, rotateX: 10 }} transition={{ type: "spring", stiffness: 60 }}>
        <div className="relative w-85 h-175 bg-black rounded-[55px] border-14 border-[#1a1a1a] shadow-2xl overflow-hidden ring-4 ring-gray-900 flex flex-col box-border">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-b-3xl z-50 flex justify-center items-center"><div className="w-20 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1"><div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"/></div></div>
            <div className="bg-[#f0f2f5] h-24 flex items-end pb-3 px-4 gap-3 z-30 shadow-sm shrink-0 border-b border-gray-300">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden border border-gray-400">
                    <img src="/images/ecacantik.jpeg" className="w-full h-full object-cover" />
                    </div>
                <div><h3 className="font-bold text-sm text-black">Ecaaa ❤️</h3><p className="text-[10px] text-green-600 font-bold">Online</p></div>
            </div>
            <div className="flex-1 w-full bg-[#efeae2] p-4 flex flex-col justify-end overflow-y-auto z-10 no-scrollbar pb-8">
                {chatHistory.map((msg: any, idx: number) => (
                    <motion.div key={`msg-${idx}`} initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`max-w-[85%] p-3 mb-2 rounded-xl text-sm shadow-sm relative ${msg.sender === 'me' ? "bg-[#d9fdd3] text-black self-end rounded-tr-none" : "bg-white text-black self-start rounded-tl-none"}`}>
                        {msg.text}
                    </motion.div>
                ))}
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


const SceneIGCard = ({ currentLyric }: any) => {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none preserve-3d"
       initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.2, opacity: 0 }} transition={{ duration: 0.5 }}>
       <motion.div className="w-90 bg-white rounded-2xl shadow-xl overflow-hidden preserve-3d border border-gray-100 ring-1 ring-gray-100"
         animate={{ z: 100, y: [-10, 10, -10], rotateX: [10, 20, 10], rotateY: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <div className="flex items-center p-3 border-b bg-white">
             <div className="w-8 h-8 bg-linear-to-tr from-yellow-400 to-purple-600 rounded-full p-0.5"><div className="w-full h-full bg-white rounded-full p-0.5"> <img src="/images/rey.jpeg" alt="Rey" className="w-full h-full object-cover" />
             </div></div>
             <span className="ml-2 font-bold text-sm text-black">Sho</span><Instagram className="ml-auto w-5 h-5 text-black" />
          </div>
          <div className="aspect-4/5 bg-gray-100 flex items-center justify-center"><video src="/videos/eca2.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover"/></div>
          <div className="p-4 text-black bg-white"><div className="flex gap-4 mb-3"><Heart className="w-6 h-6 text-red-500 fill-red-500"/><MessageCircle className="w-6 h-6"/><Send className="w-6 h-6"/></div>
             <div className="text-sm font-medium"><span className="font-bold mr-2">Sho</span><TypingCaption key={currentLyric.text} text={currentLyric.text} /></div>
          </div>
       </motion.div>
    </motion.div>
  );
};

const ScenePolaroid = ({ text }: any) => {
    return (
        <motion.div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
            initial={{ y: -1000, rotate: 15, opacity: 1 }}
            animate={{ y: 0, rotate: -5, opacity: 1 }}
            exit={{ y: 1000, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}> 
            <div className="bg-white p-4 pb-16 shadow-2xl transform w-87.5 rotate-2 border border-gray-100 ring-4 ring-white">
                <div className="aspect-3/4 bg-gray-200 mb-4 flex items-center justify-center overflow-hidden"><video src="/videos/eca1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover"/></div>
                <h1 className="text-center font-['Permanent_Marker'] text-3xl text-black mt-2">{text}</h1>
            </div>
        </motion.div>
    )
}

const SceneWatermark = ({ text }: { text: string }) => (
    <motion.div className="fixed inset-0 flex items-center justify-center z-50 bg-black text-white"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h1 className="font-black text-4xl tracking-[0.5em]">{text}</h1>
    </motion.div>
);

// MAIN COMPONENT
export default function TypographyFinal() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      if (audioRef.current && !audioRef.current.paused) {
        setCurrentTime(audioRef.current.currentTime);
        raf = requestAnimationFrame(loop);
      }
    };
    if (isPlaying) raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const isLoading = isPlaying && currentTime < INSTRUMENTAL_DELAY_S;
  const effectiveTime = currentTime - INSTRUMENTAL_DELAY_S;
  
  const currentLyricIndex = useMemo(() => {
    if (effectiveTime < 0) return -1;
    return LYRICS.findLastIndex(lyric => effectiveTime >= lyric.time);
  }, [effectiveTime]);

  const activeLyric = currentLyricIndex >= 0 ? LYRICS[currentLyricIndex] : null;
  const currentView = activeLyric?.view || 'tunnel-intro';
  const progressPercent = (currentTime / INSTRUMENTAL_DELAY_S) * 100;

  const isTunnelMode = (effectiveTime < 11.5) && ['floating', 'tunnel-intro'].includes(currentView);
  const isCinematic = ['impact-punch', 'cinematic-drift', 'flash-bang', 'floating'].includes(currentView) && !isTunnelMode;
  const isTypingChase = currentView === 'typing-chase';
  const isRooftop = currentView === 'rooftop-rise';
  const isChecklist = currentView && currentView.includes("checklist");
  const isRage = currentView === 'rage-scream';
  const isElegant = currentView === 'elegant-wave';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <div className="noise-overlay" /> 
      <div className="vignette-overlay" />
      
      <audio ref={audioRef} src="/audio/sency-dia.mp3" onEnded={() => setIsPlaying(false)} />

      {!isPlaying && (
        <div className="fixed inset-0 z-9999 bg-white flex items-center justify-center">
           <button onClick={handleStart} className="bg-black text-white px-12 py-6 rounded-full font-black text-2xl flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl">
              <Play fill="white" /> START
           </button>
        </div>
      )}

      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" progress={progressPercent} />}
      </AnimatePresence>

      {!isLoading && isPlaying && (
          <div className="fixed inset-0 w-full h-full overflow-hidden">
              <DynamicBackground view={currentView} />

              <div className="fixed inset-0 w-full h-full" style={{ perspective: "1000px", perspectiveOrigin: PERSPECTIVE_ORIGIN }}>
                
                <AnimatePresence>
                    {isTunnelMode && (
                        <SceneTunnelSafe key="tunnel-scene" lyrics={LYRICS} currentIndex={currentLyricIndex} />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isCinematic && activeLyric && (
                        <SceneCinematicMotion key={`cine-${activeLyric.time}`} text={activeLyric.text} view={activeLyric.view} />
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {isTypingChase && activeLyric && (
                        <SceneTypingChase key={`chase-${activeLyric.time}`} text={activeLyric.text} />
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {isRooftop && activeLyric && (
                        <SceneRooftop key={`rooftop-${activeLyric.time}`} text={activeLyric.text} />
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {isChecklist && activeLyric && (
                        <SceneChecklistCustom 
                            key={`check-${activeLyric.time}`} 
                            text={activeLyric.text} 
                            type={currentView === 'checklist-custom-1' ? 1 : currentView === 'checklist-custom-2' ? 2 : 3} 
                        />
                    )}
                </AnimatePresence>

                {/* NEW SCENES */}
                <AnimatePresence mode="wait">
                    {isRage && activeLyric && (
                        <SceneRageScream key={`rage-${activeLyric.time}`} text={activeLyric.text} />
                    )}
                </AnimatePresence>

                 <AnimatePresence mode="wait">
                    {isElegant && activeLyric && (
                        <SceneElegantWave key={`wave-${activeLyric.time}`} text={activeLyric.text} />
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {currentView === 'humming-party' && (
                        <SceneHummingParty key="humming-party" />
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {currentView === 'phone-chat' && activeLyric && (
                        <ScenePhonePersistent key="phone" currentLyric={activeLyric} allLyrics={LYRICS} currentTime={effectiveTime} />
                    )}

                    {currentView === 'ig-card' && activeLyric && (
                        <SceneIGCard key="ig" currentLyric={activeLyric} />
                    )}

                    {(currentView === 'photo-polaroid') && activeLyric && (
                        <ScenePolaroid key="polaroid" text={activeLyric.text} />
                    )}

                    {currentView === 'watermark' && activeLyric && (
                        <SceneWatermark key="watermark" text={activeLyric.text} />
                    )}
                </AnimatePresence>
              </div>
          </div>
      )}
    </>
  );
}