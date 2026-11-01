import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Wordmark } from '@/components/wordmark';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 text-fd-foreground">
          <Wordmark className="h-4 w-auto" />
          <span className="text-fd-muted-foreground font-medium">Docs</span>
        </span>
      ),
    },
  };
}
