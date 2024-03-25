# My NextJs Learning by using the App Router

- Doc Link [https://nextjs.org/docs]

## next Js is fullStack framework so to write the backend we write it in the api folder and here we write route.js file

## Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations

#### Routing :- A file-system based router built on top of Server Components that supports layouts, nested routing & more

    - Create a folder as same as the url & create page.js inside that folder ti access the route otherwise it gives an error.

#### Link :- Here we need to provide the href={''} instead of to={''}

# Dynammic Router

- A Dynamic Segment can be created by wrapping a folder's name in square brackets: [folderName]

```
- app/blog/[slug]/page.js      :- 	/blog/a     :- 	{ slug: 'a' }
                               :-  /blog/b      :- { slug: 'b' }
```

- Catch-all Segments:- Dynamic Segments can be extended to catch-all subsequent segments by adding an ellipsis inside the brackets [...folderName]

```
- app/shop/[...slug]/page.js   :- /shop/a	    :- { slug: ['a'] }
                               :- /shop/a/b     :- { slug: ['a','b'] }
```

- Optional Catch-all Segments:- Catch-all Segments can be made optional by including the parameter in double square brackets: [[...folderName]].

```
- app/shop/[[...slug]]/page.js :- /shop         :- {}
                               :- /shop/a       :- { slug: ['a'] }
```

### The difference between catch-all and optional catch-all segments is that with optional, the route without the parameter is also matched

#### To add the middleware we must need to create an middleware.js file in the app level folder

### Hooks

- usePathname :- usePathname is a Client Component hook that lets you read the current URL's pathname & it comes from next/navigation

- useRouter :- The useRouter hook allows you to programmatically change routes from Client Components.

- redirect :- For Server Components, use the redirect function instead of useRouter()

## Server components

- It cannot Listen to browser Events
- It cannot access browser API's
- It cannot Maintain states
- It cannot have useEffect

#### We can catch data in the Nextjs inside Fetch API only

## Layout

- App Directory must include root layout & the Root Layout is server component & cannot be set to client component.
- In the Mainlayout we must need to incluse the Html and body tag.
- we can create multiple layout or we can say seprate layout for each individual routes.

#### template.js

- If u want to use the useEffect then only u need to use the template.jsx file otherwise use the layout.jsx and it is nested inside the layout.jsx

- A template file is similar to a layout in that it wraps each child layout or page. Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation.
- While less common, you might choose a template over a layout but if you want Features that rely on useEffect and useState

- By default, template is a Server Component, but can also be used as a Client Component through the "use client" directive.

- When a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, state is not preserved, and effects are re-synchronized.

### Linking and Navigating

##### There are four ways to navigate between routes in Next.js

- Using the <Link> Component
- Using the useRouter hook (Client Components)
- Using the redirect function (Server Components)
- Using the native History API

#### Link tag

- is a built-in component that extends the HTML anchor tag to provide prefetching and client-side navigation between routes.It is the primary and recommended way to navigate between routes in Next.js.

import Link from 'next/link'

- For dynamic segments, we can use {} & in that we use template literals.

- Use the Link component to navigate between routes unless you have a specific requirement for using useRouter.

#### Prefetching

- Prefetching is a way to preload a route in the background before the user visits it.

##### There are two ways routes are prefetched in Next.js:

- Link component: Routes are automatically prefetched as they become visible in the user's viewport. Prefetching happens when the page first loads or when it comes into view through scrolling.

- router.prefetch(): The useRouter hook can be used to prefetch routes programmatically.

##### The Link's prefetching behavior is different for static and dynamic routes:

- Static Routes: prefetch defaults to true. The entire route is prefetched and cached.
- Dynamic Routes: prefetch default to automatic. Only the shared layout, down the rendered "tree" of components until the first loading.js file, is prefetched and cached for 30s. This reduces the cost of fetching an entire dynamic route, and it means you can show an instant loading state for better visual feedback to users.
  You can disable prefetching by setting the prefetch prop to false.

- #### Prefetching is not enabled in development, only in production.

#### useRouter()

- It can be used inside client components & import from next/navigation. before next 13 it can comes from next/router
- we can use the router.prefetch() to prefetch routes programmatically.

#### redirect function

- For Server Components, use the redirect function instead useRouter, comes from next/navigation

eg: redirect('/login')

- redirect internally throws an error so it should be called outside of try/catch blocks
- redirect can be called in Client Components during the rendering process but not in event handlers. You can use the useRouter hook instead.
- redirect also accepts absolute URLs and can be used to redirect to external links.

#### Caching

- Next.js has an in-memory client-side cache called the Router Cache
- The cache is reused as much as possible, instead of making a new request to the server, improving performance by reducing the number of requests and data transferred to server

#### Partial Rendering

- Partial rendering means only the route segments that change on navigation re-render on the client, and any shared segments are preserved.
- Without partial rendering, each navigation would cause the full page to re-render on the client. Rendering only the segment that changes reduces the amount of data transferred and execution time, leading to improved performance.

#### Soft Navigation

- Browsers perform a "hard navigation" when navigating between pages
- Next.js Router enables "soft navigation" between pages, ensuring only the route segments that have changed are re-rendered (partial rendering).This enables client React state to be preserved during navigation.

#### Loading UI and Streaming

- The special file loading.js helps you create meaningful Loading UI with React Suspense
- With this convention, you can show an instant loading state from the server
