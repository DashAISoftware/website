import type { Metadata } from 'next'
import es from '@/public/locales/es/labs.json'
import { LABS } from '@/data/labs'
import { LabDetailRoute } from '@/components/community/routes/LabDetailRoute'

type Params = { params: Promise<{ slug: string }> }

const text = es as Record<string, string>

// Only labs with their own page are built.
export const dynamicParams = false
export function generateStaticParams() {
  return LABS.filter((l) => l.hasDetail).map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${text[`labs.item.${slug}.title`]} | Labs`,
    description: text[`labs.item.${slug}.intro`],
    alternates: { canonical: `/labs/${slug}` },
  }
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  return <LabDetailRoute slug={slug} />
}
