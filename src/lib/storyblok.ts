import Page from '@/components/Page';
import Teaser from '@/components/Teaser';
import Grid from '@/components/Grid';
import Feature from '@/components/Feature';
import FallbackComponent from '@/components/FallbackComponent';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    page: Page,
    grid: Grid,
    feature: Feature,
  },

  enableFallbackComponent: true,
  customFallbackComponent: FallbackComponent,
});
