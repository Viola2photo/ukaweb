import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { FeaturedStore } from "@/lib/brand-data";

const ROTATE_MS = 6000;

// Shows one new franchise partner at a time and rotates through them.
// Starts on the first store so server and client markup match.
export function StoreSpotlight({ stores }: { stores: readonly FeaturedStore[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = stores.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  const store = stores[index % Math.max(count, 1)];
  if (!store) return null;

  return (
    <div
      className="store-spotlight"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Link
        key={store.slug}
        to="/stores/$slug"
        params={{ slug: store.slug }}
        className="card store-card"
        aria-live="polite"
      >
        <img src={store.image} alt="" loading="lazy" />
        <span className="store-card-body">
          <span className="store-badge">{store.badge}</span>
          <strong>{store.name}</strong>
          <small>{store.address}</small>
          <span className="store-card-more">看新據點介紹 →</span>
        </span>
      </Link>
      {count > 1 && (
        <div className="store-dots" role="group" aria-label="切換新加盟點位">
          {stores.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              aria-label={`看${s.name}`}
              aria-current={i === index}
              className={i === index ? "on" : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
