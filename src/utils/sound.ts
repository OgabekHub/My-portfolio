class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("sound_muted");
      this.isMuted = savedMute === "true";
    }
  }

  private initCtx(): AudioContext | null {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("sound_muted", String(this.isMuted));
    }
    return this.isMuted;
  }

  public getMuteStatus(): boolean {
    return this.isMuted;
  }

  private playTone(
    startFreq: number,
    endFreq: number,
    duration: number,
    type: OscillatorType = "sine",
    volume: number = 0.05
  ) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      
      if (startFreq !== endFreq) {
        // Ensure values are positive and non-zero for exponential ramp
        const endVal = endFreq > 0 ? endFreq : 0.01;
        osc.frequency.exponentialRampToValueAtTime(endVal, ctx.currentTime + duration);
      }

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Sound play failure:", e);
    }
  }

  public playHover() {
    this.playTone(900, 700, 0.03, "sine", 0.015);
  }

  public playClick() {
    this.playTone(550, 250, 0.06, "triangle", 0.04);
  }

  public playThemeToggle(toDark: boolean) {
    if (toDark) {
      this.playTone(380, 140, 0.22, "sine", 0.06);
    } else {
      this.playTone(160, 480, 0.22, "sine", 0.06);
    }
  }
}

export const soundManager = new SoundManager();
