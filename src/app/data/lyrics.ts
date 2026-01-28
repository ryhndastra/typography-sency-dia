
export type ViewMode = 
  // --- LEGACY ---
  | "tunnel-intro"      
  | "floating" 
  | "glitch-distort"    
  | "phone-chat"        
  | "ig-card"           
  | "photo-polaroid"
  | "watermark"
  
  // --- CINEMATIC MODES ---
  | "typing-chase"       
  | "impact-punch"       
  | "cinematic-drift"    
  | "flash-bang"
  
  // --- SPECIAL SCENES ---
  | "humming-party"
  | "rooftop-rise"
  
  // --- CUSTOM CHECKLIST ---
  | "checklist-custom-1" 
  | "checklist-custom-2" 
  | "checklist-custom-3"
  
  // --- AESTHETIC MODES ---
  | "rage-scream"        // DANGDUTE ENDI COK
  | "elegant-wave";      // Paling Asyik/Classy

export type Sender = "me" | "her";

export interface Lyric {
  time: number;
  text: string;
  view: ViewMode;
  sender?: Sender;
}

export const LYRICS: Lyric[] = [
  // --- OPENING (TUNNEL - KAMERA AKAN NGAMBANG) ---
  { time: 0.5, text: "Sudah lama ku menunggu", view: "floating" },
  { time: 4.5, text: "Ku berhadapan denganmu", view: "floating" },
  { time: 8.0, text: "Kau menghentikan waktuku", view: "floating" },
  { time: 10.0, text: "Tatapanmu membuatku aku", view: "floating" },
  
  // IMPACT
  { time: 11.9, text: "Jatuh cinta padamu", view: "flash-bang" }, 
   
  // --- VERSE 1 ---
  { time: 15.0, text: "Kau membuatku tak ragu-ragu", view: "cinematic-drift" }, 
  { time: 19.5, text: "Ku 'kan habiskan waktuku hanya untukmu", view: "cinematic-drift" }, 
   
  // --- BEAT DROP (RAGE MODE) ---
  { time: 25.0, text: "DANGDUTE ENDI, COK?", view: "rage-scream" },
   
  // --- VERSE 2 (IG CARD) ---
  { time: 26.5, text: "Gak usah centang biru", view: "ig-card" },
  { time: 28.0, text: "tapi kamu dah verified", view: "ig-card" },
  
  { time: 30.0, text: "Emang paling cantik, ya", view: "cinematic-drift" },
  { time: 31.5, text: "memang kamu certified", view: "impact-punch" },
   
  // --- PRE-CHORUS ---
  { time: 33.0, text: "Cuma satu, ya", view: "typing-chase" }, 
  { time: 34.0, text: "one of one", view: "typing-chase" },
  { time: 35.0, text: "I swear you hard to find", view: "flash-bang" },
   
  { time: 36.5, text: "Putih kayak susu", view: "cinematic-drift" },
  { time: 38.0, text: "aku jadi espresso-nya", view: "cinematic-drift" },
   
  // --- CHAT SCENE ---
  { time: 39.5, text: "Ketemu di IG", view: "phone-chat", sender: "her" },
  { time: 41.0, text: "tapi bisakah kalo kita ketemuan nanti?", view: "phone-chat", sender: "her" },
  { time: 44.0, text: "Bebas pilih mana", view: "phone-chat", sender: "me" },
  { time: 45.0, text: "mau ke Gancy or Sency?", view: "phone-chat", sender: "me" },
  { time: 47.0, text: "Jadi janganlah sensi", view: "phone-chat", sender: "her" },
  { time: 49.0, text: "'kan kita mau happy", view: "phone-chat", sender: "her" },
  { time: 50.5, text: "Nanti ku izin mami", view: "phone-chat", sender: "her" },
   
  // --- HUMMING PARTY ---
  { time: 52.0, text: "HUMMING_START", view: "humming-party" },
   
  // --- CHECKLIST CUSTOM ---
  { time: 66.0, text: "TINGKAH LUUCU, cek", view: "checklist-custom-1" },
  { time: 68.0, text: "KUTU BUKU, cek", view: "checklist-custom-2" },
  { time: 69.5, text: "SAYANG ORTU, cek", view: "checklist-custom-3" },
  
  // POLAROID
  { time: 71.0, text: "KAMU 100% (MY TYPE)", view: "photo-polaroid" }, 
   
  // --- BRIDGE ---
  { time: 73.5, text: "Baby, you look so fine", view: "typing-chase" }, 
  { time: 75.0, text: "Kita makan malam", view: "cinematic-drift" }, 
  
  // --- ROOFTOP (CITY SKYLINE) ---
  { time: 77.0, text: "Dinner rooftop yang high", view: "rooftop-rise" },
   
  { time: 78.5, text: "What's the dress code, baby?", view: "phone-chat", sender: "her" },
  { time: 80.5, text: "Black and yellow, maybe?", view: "phone-chat", sender: "me" },
   
  // --- OUTRO ---
  { time: 82.0, text: "Kalo udah ready", view: "typing-chase" },
  { time: 83.7, text: "I'll be there for my lady", view: "cinematic-drift" },
  
  { time: 84.8, text: "No make up, tetep cantik", view: "elegant-wave" },
  { time: 87.0, text: "Paling asyik", view: "elegant-wave" },
  { time: 89.0, text: "Paling classy", view: "elegant-wave" },
  
  { time: 91.0, text: "Paling-", view: "impact-punch" },
  { time: 92.0, text: "Sama-sama suka", view: "floating" },
   
  // --- ENDING ---
  { time: 93.7, text: "SHO", view: "watermark" },
];