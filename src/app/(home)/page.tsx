import { redirect } from 'next/navigation';
import { getSectionTabs } from '@/lib/sections';

// Every docs page lives under a section tab, so the root opens the first section.
export default function HomePage() {
  redirect(getSectionTabs()[0].url);
}
