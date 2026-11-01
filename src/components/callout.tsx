import { Callout as FumaCallout } from 'fumadocs-ui/components/callout';
import type { ReactNode } from 'react';

const WARN_EMOJIS = ['🚨', '⚠️', '❗', '❗️', '🛑', '❌'];

// Compatibility shim for the `<Callout emoji type>` API used by the content ported
// from the Astro site; maps it onto the Fumadocs callout.
export function Callout({
  children,
  type,
  emoji = '💡',
  title,
}: {
  children: ReactNode;
  type?: '' | 'warning' | 'error' | 'info' | 'warn' | 'success' | 'idea';
  emoji?: string;
  title?: ReactNode;
  // Accepted for compatibility; no longer affect rendering.
  render?: 'md' | 'html';
  longConent?: boolean;
}) {
  const resolved =
    type === 'error'
      ? 'error'
      : type === 'info' ||
          type === 'warn' ||
          type === 'success' ||
          type === 'idea'
        ? type
        : WARN_EMOJIS.includes(emoji)
          ? 'warn'
          : 'info';

  return (
    <FumaCallout type={resolved} title={title} icon={<span>{emoji}</span>}>
      {children}
    </FumaCallout>
  );
}
