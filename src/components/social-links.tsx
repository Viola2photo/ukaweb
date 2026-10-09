import { Button } from "@/components/ui/button";
import { contact } from "@/lib/brand-data";
import { trackEvent } from "@/lib/analytics";

type SocialLinksProps = {
  /** Button style: "line" on red/dark backgrounds, "inkline" on cream cards. */
  variant: "line" | "inkline";
  /** Where the block sits, sent with the click_social analytics event. */
  place: string;
  /** Optional lead-in text shown before the buttons. */
  label?: string;
  className?: string;
};

export function SocialLinks({ variant, place, label, className }: SocialLinksProps) {
  return (
    <div className={["social-links", className].filter(Boolean).join(" ")}>
      {label && <span className="social-label">{label}</span>}
      {contact.social.map((s) => (
        <Button key={s.id} variant={variant} asChild>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_social", { network: s.id, place })}
          >
            {s.label}
          </a>
        </Button>
      ))}
    </div>
  );
}
