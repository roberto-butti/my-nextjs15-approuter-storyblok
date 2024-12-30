import { storyblokEditable } from '@storyblok/react/rsc';


export default function Teaser({ blok }: any) {
  return <div {...storyblokEditable(blok)}>
    { blok.headline } <p>{ new Date().toJSON()}</p>
  </div>;
}
