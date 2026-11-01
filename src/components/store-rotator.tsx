import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { FeaturedStore } from "@/lib/brand-data";

const ROTATE_MS = 7000;

function shuffle<T>(items: readonly T[], avoidFirst?: T): T[] {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j]!, list[i]!];
  }
  if (list.length > 1 && list[0] === avoidFirst) [list[0], list[1]] = [list[1]!, list[0]!];
  return list;
}

// One store card at a time, in a random order that changes on a fixed timer.
// The server and the first client render use the given order; the shuffle runs after mount.
export function StoreRotator({ stores }: { stores: readonly FeaturedStore[] }) {
  const [order, setOrder] = useState<readonly FeaturedStore[]>(stores);
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = order.length;

  useEffect(() => {
    setOrder(shuffle(stores));
    setPosition(0);
  }, [stores]);

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setPosition((p) => {
        if (p + 1 < count) return p + 1;
        setOrder((current) => shuffle(current, current[count - 1]));
        return 0;
      });
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  const store = order[position % Math.max(count, 1)];
  if (!store) return null;

  return (
    <div
      className="store-rotator"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Link
        key={store.slug}
        to="/stores/$slug"
        params={{ slug: store.slug }}
        className="card store-feature rise"
      >
        <img src={store.image} alt="" loading="lazy" />
        <span className="store-feature-body">
          <strong>{store.name}</strong>
          <small>{store.address}</small>
          {store.days && <small>營業日：{store.days}</small>}
          <span className="store-feature-text">{store.intro[0]}</span>
          <span className="store-card-more">看新據點介紹 →</span>
        </span>
      </Link>
      {count > 1 && (
        <div className="store-dots" role="group" aria-label="切換點位故事">
          {order.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              aria-label={`看${s.name}`}
              aria-current={i === position}
              className={i === position ? "on" : undefined}
              onClick={() => setPosition(i)}
            />
          ))}
        </div>
      )}
      <nav className="sr-only" aria-label="所有新加盟點位">
        <ul>
          {stores.map((s) => (
            <li key={s.slug}>
              <Link to="/stores/$slug" params={{ slug: s.slug }}>
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
