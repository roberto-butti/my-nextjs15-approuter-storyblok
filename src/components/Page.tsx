import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc';

export default function Page({ blok }: any) {
  return   <main {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok: any) => (
      <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
}
