import { storyblokEditable } from '@storyblok/react/rsc';
import { FeatureStoryblok } from '@/components/component-types-sb'

interface FeatureProps {
  blok: FeatureStoryblok;
}

export default function Feature({ blok }: FeatureProps) {
  return <div {...storyblokEditable(blok)}>
    Feature: { blok.name }
  </div>;
}
