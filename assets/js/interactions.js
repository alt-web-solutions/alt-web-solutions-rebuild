const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const init3dCards = () => {
  if (motionQuery.matches) return;

  Array.from(document.getElementsByClassName("3d-interaction")).forEach((card) => {
    const maxTilt = 6;
    let rect = null;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    card.addEventListener("pointerenter", () => {
      rect = card.getBoundingClientRect();
    });

    card.addEventListener("pointermove", (event) => {
      rect ||= card.getBoundingClientRect();

      const x = clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
      const y = clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);

      card.style.setProperty("--tilt-x", `${(-y * maxTilt).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * maxTilt).toFixed(2)}deg`);
      card.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(2)}%`);
      card.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(2)}%`);
    });

    card.addEventListener("pointerleave", () => {
      rect = null;
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
      card.style.removeProperty("--glow-x");
      card.style.removeProperty("--glow-y");
    });
  });
};

init3dCards();
