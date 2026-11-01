import { Link } from "@tanstack/react-router";
import type { FeaturedStore } from "@/lib/brand-data";

// Every new franchise stall as a card; the grid picks its own column count from the width.
export function StoreGrid({ stores }: { stores: readonly FeaturedStore[] }) {
  return (
    <ul className="store-grid">
      {stores.map((store) => (
        <li key={store.slug}>
          <Link
            to="/stores/$slug"
            params={{ slug: store.slug }}
            className="card store-card"
          >
            <img src={store.image} alt="" loading="lazy" />
            <span className="store-card-body">
              <span className="store-badge">{store.badge}</span>
              <strong>{store.name}</strong>
              <small>{store.address}</small>
              {store.days && <small>營業日：{store.days}</small>}
              <span className="store-card-more">看新據點介紹 →</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
