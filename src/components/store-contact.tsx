import { Check, Copy, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopyText } from "@/hooks/use-copy-text";
import { contact } from "@/lib/brand-data";
import { trackEvent } from "@/lib/analytics";

// Small consultation block at the bottom of a store page: call or copy the LINE ID.
export function StoreContact({ where }: { where: string }) {
  const line = useCopyText(contact.lineId);

  const onCopy = async () => {
    const ok = await line.copy();
    if (ok) trackEvent("copy_line", { location: where });
  };

  return (
    <section className="store-contact" aria-label="諮詢方式">
      <p className="store-contact-title">想詢問或了解加盟？</p>
      <p className="store-contact-hint">LINE ID 與諮詢電話相同。</p>
      <div className="store-contact-buttons">
        <Button variant="ink" size="sm" asChild>
          <a
            href={contact.phoneHref}
            onClick={() => trackEvent("click_call", { location: where })}
          >
            <Phone />
            諮詢電話 {contact.phone}
          </a>
        </Button>
        <Button variant="inkline" size="sm" onClick={onCopy}>
          {line.state === "success" ? <Check /> : <Copy />}
          {line.state === "success" ? "LINE ID 已複製" : "複製 LINE ID"}
        </Button>
      </div>
      {line.state === "fallback" && (
        <label className="store-contact-backup">
          LINE ID
          <input
            readOnly
            value={contact.lineId}
            onFocus={(e) => e.currentTarget.select()}
            aria-label="手動複製 LINE ID"
          />
        </label>
      )}
    </section>
  );
}
