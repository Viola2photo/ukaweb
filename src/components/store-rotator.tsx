import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { FeaturedStore } from "@/lib/brand-data";

const ROTATE_MS = 7000;
const MAX_COLUMNS = 3;

// Same breakpoints as the CSS: 3 cards on wide screens, 2 on tablets, 1 on phones.
function columnsNow() {
  if (typeof window === "undefined") return 1;
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

function shuffle<T>(items: readonly T[], avoidFirst?: T): T[] {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j]!, list[i]!];
  }
  if (list.length > 1 && list[0] === avoidFirst) [list[0], list[1]] = [list[1]!, list[0]!];
  return list;
}

// Wide screens show several cards at once and move on a page at a time; phones show one card.
// Either way the order is random and changes on a fixed timer. The server and the first
// client render use the given order, and the shuffle runs after mount.
export function StoreRotator({ stores }: { stores: readonly FeaturedStore[] }) {
  const [order, setOrder] = useState<readonly FeaturedStore[]>(stores);
  const [position, setPosition] = useState(0);
  const [columns, setColumns] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = order.length;

  useEffect(() => {
    setOrder(shuffle(stores));
    setPosition(0);
  }, [stores]);

  useEffect(() => {
    const update = () => setColumns(columnsNow());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const visible = Math.min(columns, count);
  const rotates = count > visible;

  useEffect(() => {
    if (!rotates || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setPosition((p) => {
        const next = p + visible;
        if (next < count) return next;
        setOrder((current) => shuffle(current, current[count - 1]));
        return 0;
      });
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [rotates, paused, visible, count]);

  const shown = Array.from({ length: Math.min(MAX_COLUMNS, count) }, (_, i) => {
    const store = order[(position + i) % count];
    return store;
  }).filter((s): s is FeaturedStore => Boolean(s));
  if (shown.length === 0) return null;

  const pages = Math.ceil(count / visible);
  const page = Math.floor(position / visible);

  return (
    <div
      className="store-rotator"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="store-rotator-grid" data-count={Math.min(count, MAX_COLUMNS)}>
        {shown.map((store) => (
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
        ))}
      </div>
      {rotates && (
        <div className="store-dots" role="group" aria-label="切換點位故事">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`第 ${i + 1} 組點位`}
              aria-current={i === page}
              onClick={() => setPosition(i * visible)}
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
