import Background from "@/components/Background";
import Counter from "@/components/Counter";

function parseEnvCountdown(val: string | undefined): number {
  if (!val) return 999;
  const parts = val.split(":").map(p => parseInt(p, 10) || 0);
  if (parts.length === 4) {
    const [d, h, m, s] = parts;
    return d * 86400 + h * 3600 + m * 60 + s;
  }
  if (parts.length === 3) {
    const [h, m, s] = parts;
    return h * 3600 + m * 60 + s;
  }
  if (parts.length === 2) {
    const [m, s] = parts;
    return m * 60 + s;
  }
  return parts[0] || 999;
}

export default function Home() {
  const envVal = process.env.NEXT_PUBLIC_COUNTDOWN_TIMER;
  const initialTimerValue = parseEnvCountdown(envVal);

  console.log("NEXT_PUBLIC_COUNTDOWN_TIMER FROM ENV:", envVal);
  console.log("INITIAL TIMER VALUE PARSED (seconds):", initialTimerValue);

  return (
    <Background>
      <div className="flex flex-col items-center justify-center gap-12 z-10 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-moralana uppercase tracking-wide sm:tracking-widest text-center bg-clip-text text-transparent bg-gradient-to-b from-[#EEDEC5] to-[#EEDEC5]/75 drop-shadow-lg select-none py-4 leading-normal">
          deployed &lt;3
        </h1>

        
        <p className="text-sm md:text-base font-bold tracking-widest text-[#EEDEC5]/50 uppercase select-none animate-pulse">
          did it somehow
        </p>
      </div>
    </Background>
  );
}
