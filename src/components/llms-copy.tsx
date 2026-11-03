'use client';
import { Bot, Check } from 'lucide-react';
import {
  ThemeSwitch,
  type ThemeSwitchProps,
} from 'fumadocs-ui/layouts/shared/slots/theme-switch';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { siteUrl } from '@/lib/shared';

const llmsUrl = `${siteUrl}/llms.txt`;

// Same classes as the GitHub link next to it. `buttonVariants({ size: 'icon-sm' })`
// would keep the base `p-2` alongside `p-1.5`; Fumadocs drops it with tailwind-merge.
const iconButton =
  'inline-flex items-center justify-center rounded-md p-1.5 text-sm font-medium transition-colors duration-100 hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring [&_svg]:size-4.5';

// Copies the llms.txt URL, the docs index for AI agents.
export function CopyLlmsButton() {
  const [checked, onClick] = useCopyButton(() =>
    navigator.clipboard.writeText(llmsUrl),
  );
  const label = checked
    ? 'Copied llms.txt link'
    : 'Copy llms.txt link for AI agents';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={iconButton}
    >
      {checked ? <Check /> : <Bot />}
    </button>
  );
}

// Fumadocs renders the theme switch right after the icon links (GitHub), so the
// copy button goes in that slot, before the default switch.
export function ThemeSwitchWithLlms(props: ThemeSwitchProps) {
  return (
    <>
      <CopyLlmsButton />
      <ThemeSwitch {...props} />
    </>
  );
}
