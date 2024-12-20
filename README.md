## Minimal template for Nextjs 15, App Router, and Storyblok

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that integrates with Storyblok.
This example highlights the relevant things you need to set up/configure/implement in NextJS to integrate with Storyblok content and, most importantly, enable the Storyblok Visual Editor even using the Server Components.

> 📖 This Readme file highlights the relevant part you need to consider for the Storyblok integration. If you want to read more, here I wrote an article: [How to build a dynamic website with Next.js 15 App Router, React 19, Storyblok, and Bun (+ Typescript)](https://dev.to/robertobutti/how-to-build-a-dynamic-website-with-nextjs-15-app-router-react-19-storyblok-and-bun--2972)

<img src="https://a.storyblok.com/f/317897/1354x547/9a927f8c88/screenshot-2024-12-20-at-19-18-04.png/m/800x0" alt="The Storyblok Visual Editor with the Nextjs 15 Application" width="800"/>

## Install the version 4 of Storyblok React SDK
The Storyblok React SDK version 4 supports the Server Components and the App Router.

```shell
bun add @storyblok/react@4
```

## Starting the HTTPs server

Starting the HTTP**S** server to use the localhost as a preview URL.

```
bun run dev --experimental-https
```

## Set the Access Token

In `.env.local`
```env
NEXT_PUBLIC_STORYBLOK_TOKEN=your_token_here
```

## Set the storyblok.ts
Create the `storyblok.ts` to initialize the Storyblok connection, and check [src/lib/storyblok.ts](src/lib/storyblok.ts).

You can initialize the Storyblok object via the `storyblokInit` function, setting the access token and listing the components.

## The StoryblokProvider
Implement the Storyblok provider. The Storyblok Provider is needed to initialize and use the Storyblok bridge on the client side. Check [src/components/StoryblokProvider.ts](src/components/StoryblokProvider.ts)

- Using `use client` for initializing the Storyblok bridge on the client side.
- In the Storyblok Provider, you should reinitialize the Storyblok object (to use the Storyblok Bridge).

## Add The StoryblokProvider in the layout.tsx
Import and wrap the `<html />` tag with the `<StoryblokProvider />` one.

## Define the catch-all route

In the route `src/app/[slug]/page.tsx` file you need to:

- Import the `getStoryblokApi`
- Import `StoryblokStory` from `@storyblok/react/rsc`
- Implement the `fetchData` function (async)
- Fetch data (await)

## Create the `tsx` component files for the Content type (`Page.tsx`)

In the component file that represents your content type (in this case, the `page` Storyblok content type is mapped as `src/app/components/Page.tsx`) you will:

- Import the `storyblokEditable` and `StoryblokServerComponent` from `@storyblok/react/rsc`
- Set the `{...storyblokEditable(blok)}` on the main tag
- Use the `StoryblokServerComponent` for loading components

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

## Create the `tsx` component files for the Storyblok Component (`Teaser.tsx` etc)

In the component files that represent your Storyblok components, you have to:

- Import the `storyblokEditable`
- Add `{...storyblokEditable(blok)}` to the root tag
- Obtain the `blok` object (the object with the Storyblok component data) as a props

```tsx
import { storyblokEditable } from '@storyblok/react/rsc';

export default function Teaser({ blok }: any) {
  return <div {...storyblokEditable(blok)}>
    { blok.headline }
  </div>;
}
```

## References

- [Announcing React SDK v4 with full support for React Server Components](https://www.storyblok.com/mp/announcing-react-sdk-v4-with-full-support-for-react-server-components)
- [The Open source Storyblok React SDK](https://github.com/storyblok/storyblok-react)
- [My Article about How to build a dynamic website with Next.js 15 App Router, React 19, Storyblok, and Bun (+ Typescript)](https://dev.to/robertobutti/how-to-build-a-dynamic-website-with-nextjs-15-app-router-react-19-storyblok-and-bun--2972)
