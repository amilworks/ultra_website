import { getCollection, type CollectionEntry } from "astro:content";

export type NewsEntry = CollectionEntry<"news">;

const sortByDateDesc = <T extends { data: { date: Date; title: string } }>(left: T, right: T) => {
  const byDate = right.data.date.getTime() - left.data.date.getTime();
  if (byDate !== 0) {
    return byDate;
  }
  return left.data.title.localeCompare(right.data.title);
};

const sortByEditorialOrder = <T extends { data: { date: Date; title: string; sequence?: number } }>(
  left: T,
  right: T,
) => {
  const leftSequence = left.data.sequence ?? Number.MAX_SAFE_INTEGER;
  const rightSequence = right.data.sequence ?? Number.MAX_SAFE_INTEGER;
  if (leftSequence !== rightSequence) {
    return leftSequence - rightSequence;
  }
  return sortByDateDesc(left, right);
};

export async function getAllNews(): Promise<NewsEntry[]> {
  const news = await getCollection("news");
  return news.sort(sortByEditorialOrder);
}

export async function getFeaturedNews(): Promise<NewsEntry | undefined> {
  const news = await getAllNews();
  return news.find((entry) => entry.data.featured) ?? news[0];
}

export async function getLatestNews(limit = 3, excludeSlug?: string): Promise<NewsEntry[]> {
  const news = await getAllNews();
  const filtered = excludeSlug ? news.filter((entry) => entry.data.slug !== excludeSlug) : news;
  return filtered.slice(0, limit);
}

export async function getWhitePapers(): Promise<NewsEntry[]> {
  const news = await getAllNews();
  return news.filter((entry) => entry.data.kind === "White paper");
}

export function formatLongDate(value: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}
