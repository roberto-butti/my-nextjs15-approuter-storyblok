## Minimal template for Nextjs 15, App Router, and Storyblok

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that integrates with Storyblok.
This example aims to higlight the relevant things you need to setup/configure/implement in NextJS in order to integrate with Storyblok data and most important, enabling the Storyblok Visual Editor even if using the Server Components.

## Install the version 4 of Storyblok Ract SDK
The version 4 supports the Server Components and the App Router.

```shell
bun add @storyblok/react@4
```

## Starting the HTTPs server

Starting the HTTP**S** server in order to use the localhost as preview URL.

```
bun run dev --experimental-https
```

## Set the Access Token

In `.env.local`
```env
NEXT_PUBLIC_STORYBLOK_TOKEN=your_token_here
```

## Set the storyblok.ts
Set the `storyblok.ts` for initializing the Storyblok connection, check [src/lib/storyblok.ts](src/lib/storyblok.ts)

## The StoryblokProvider
Implement the Storyblok provider. Check [src/components/StoryblokProvider.ts](src/components/StoryblokProvider.ts)

- Using `use client` (because the Storyblok Provider is needed for initializing and using the Storyblok bridge on the client side)
- in the stroyblok provider you should reinitialize the Stroyblok (for the storyblok bridge)

## Add The StoryblokProvider in the layout.tsx
Import and wrap the `<html />` tag with the `<StoryblokProvider />` one.

## Define the catch all route

- importing the `getStoryblokApi`
- importing `StoryblokStory` from `@storyblok/react/rsc`
- implementing the fetchData function (async)
- fetching data (await)

## Create the tsx component files for the Content type (Page.tsx)

- importing storyblokEditable and StoryblokServerComponent from `@storyblok/react/rsc`
- set the `{...storyblokEditable(blok)}` on the main tag
- use `StoryblokServerComponent` for loading components

```tsx
import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc';


export default function Page({ blok }: any) {
  return   <main {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok: any) => (
      <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
}

```

## Create the tsx component files for the Storyblok Component (Teaser.tsx etc)

- Import the `storyblokEditable`
- Add `{...storyblokEditable(blok)}` to the root tag

```tsx
import { storyblokEditable } from '@storyblok/react/rsc';

export default function Teaser({ blok }: any) {
  return <div {...storyblokEditable(blok)}>
    { blok.headline }
  </div>;
}
```
