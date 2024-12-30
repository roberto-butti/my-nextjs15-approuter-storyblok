
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';
import styles from "../page.module.css";
import Image from "next/image";

export const revalidate = 0
export const fetchCache = "force-no-store"

async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();
  await storyblokApi.flushCache()
  return storyblokApi.get(
    'cdn/stories/' + slug,
    {
      version: 'draft',
      //cv: new Date().getTime()
    },
    { cache: 'no-store' }
  );
}
async function fetchDataSpace() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get('cdn/spaces/me');
}



export default async function StoryPage({params}
  : {
    params: Promise<{ slug: string }>
  }) {
  const slug = (await params).slug

  const [dataResponseStory, dataResponseSpace] = await Promise.all([
    fetchData(slug),
    fetchDataSpace()
  ]);
  const dataStory = dataResponseStory.data.story;
  const dataSpace = dataResponseSpace.data.space;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <StoryblokStory story={dataStory} />
      </main>
      <footer className={styles.footer}>
        <div>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>

        <a
          href={ "https://app.storyblok.com/#/me/spaces/" + dataSpace.id  + "/stories/0/0/" + dataStory.id }
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to Space: ({ dataSpace.id }) { dataSpace.name } →
        </a>
        </div>
        <div>
          Updated at: { dataStory.updated_at }<br/>
          Now is: {  new Date().toJSON() }<br/>
        </div>
      </footer>
    </div>
  );
}
