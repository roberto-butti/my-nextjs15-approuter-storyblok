import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc';

export default function Grid({ blok }: any) {
  return <div {...storyblokEditable(blok)}>
    This is a Grid with { blok.columns.length } columns
    {blok.columns.map((nestedBlok: any) => (
      <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </div>;

}
