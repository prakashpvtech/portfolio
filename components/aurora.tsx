/* Yellow / purple / off-white colour fields plus outlined shapes drifting behind
   the page, with scroll-driven parallax where the browser supports it. Server
   component: no JS ships for this, and the global prefers-reduced-motion rule
   freezes every animation. */
export function Aurora() {
  return (
    <div className="aurora" aria-hidden>
      <div className="aurora-layer">
        <span className="aurora-blob aurora-blob-1" />
        <span className="aurora-blob aurora-blob-2" />
        <span className="aurora-blob aurora-blob-3" />
        <span className="aurora-blob aurora-blob-4" />
        <span className="aurora-blob aurora-blob-5" />

        <span className="aurora-shape aurora-shape-1" />
        <span className="aurora-shape aurora-shape-2" />
        <span className="aurora-shape aurora-shape-3" />
        <span className="aurora-shape aurora-shape-4" />
        <span className="aurora-shape aurora-shape-5" />
      </div>
    </div>
  );
}
