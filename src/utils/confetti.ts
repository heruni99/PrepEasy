import confetti from 'canvas-confetti';

/**
 * Trigger a celebratory confetti burst across the screen.
 */
export function triggerConfetti() {
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#FF3B30', '#FFD166', '#06D6A0', '#118AB2', '#FF8E3C']
  });
}

/**
 * Trigger localized confetti from an element's position (e.g. favorite button).
 */
export function triggerHeartBurst(event?: React.MouseEvent) {
  if (event) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 50,
      startVelocity: 25,
      origin: { x, y },
      colors: ['#FF3B30', '#FF6B6B', '#FFD166', '#FF85A1']
    });
  } else {
    triggerConfetti();
  }
}
