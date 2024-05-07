# My NextJs Learning by using the App Router

- [Doc Link](https://nextjs.org/docs)

# `npx create-next-app@latest` It help to install the Next js in your project

- `npm run dev` It help to start the next app i.e runing the server

## Next Js is fullStack framework so to write the backend we write it in the api folder and here we write in route.js file

## Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations

#### Routing :- A file-system based router built on top of Server Components that supports layouts, nested routing & more

    - Create a folder as same as the You wanted in url & create page.js inside that folder to access the route otherwise it gives an error.

#### Link :- Here we need to provide the href={''} instead of to={''}

#

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

- usePathname :- usePathname is a Client Component hook that let's you read the current URL's pathname & it comes from next/navigation

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
- In the Mainlayout we must need to include the Html and body tag.
- we can create multiple layout or we can say separate layout for each individual routes.

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

### Server-Side Rendering (SSR)

- SSR Improve the performance by showing non-interactive pages.
- With SSR, there's a series of steps that need to be completed before a user can see and interact with a page:

  - First, all data for a given page is fetched on the server.
  - The server then renders the HTML for the page.
  - The HTML, CSS, and JavaScript for the page are sent to the client.
  - A non-interactive user interface is shown using the generated HTML, and CSS.
  - Finally, React hydrates the user interface to make it interactive.

- Render or load HTML for server page once.

#### client:- react hydrate once after all the components been downloaded

#### Error Handling

- The error.js file convention allows you to gracefully handle unexpected runtime errors in nested routes.
- Error component must be client component

#### global-error.js

- To specifically handle errors in root layout.js, use a variation of error.js called app/global-error.js located in the root app directory.
- global-error.js replaces the root layout.js when active and so must define its own html and body tags.

#### Parallel Routes

- Parallel Routes allows you to simultaneously or conditionally render one or more pages within the same layout. They are useful for highly dynamic sections of an app, such as dashboards and feeds on social sites.
- Slots

  - Parallel routes are created using named slots. Slots are defined with the @folder convention. For example, the following file structure defines two slots: @analytics and @team.

- default.js
  - can define a default.js file to render as a fallback for unmatched slots during the initial load or full-page reload.
  - On reload or rerender , it will first try to Render the unmac=tch slot's default.js file, if not available then show 404 error.
  - Ensure that content of modal doesn't get rerender when it not active.

#### Intercepting Routes

- It allows you to load a route from another part of your application within the current layout. This routing can be useful when you want to display the content of a route without the user switching to a different context.

#### Intercepting routes can be defined with the (..) convention, which is similar to relative path convention ../ but for segments.

- You can use:
  - (.) to match segments on the same level
  - (..) to match segments one level above
  - (..)(..) to match segments two levels above
  - (...) to match segments from the root app directory

It can be use with parallel routes

#### Route Handlers

- It allow you to create custom request handlers
- Route Handlers are only available inside the app directory. They are the equivalent of API Routes inside the pages directory meaning you do not need to use API Routes and Route Handlers together.
- route.js
  - By default rouye handlers are catched when using get method

### Middleware

- It allows you to run code before a request is completed
- It runs before cached content and routes are matched

# Next Auth

### useSession

- If there is session present in the session it will return it majorly it is use for the getting token
- There is 3 values in the data i.e session, undefine, null

#### It is hook and can be use in the functional component Only but only in client component

### getSession

- It is similar to useSession but it is not hook so we can use anywhere but only in client component

### getServerSession

- It is similar to useSession or getSession but it is not hook so we can use anywhere but only in client component

#### loading.jsx

- when we want to show the loading when going to that component then use the loading.jsx and in that component page if u want to show the loading to perticular section of page use the react Suspense and fallback in between suspense use the component to show the loading in the page

###### After going on the anyling it automatically prefectched that data in the browser to reduce the task until u refresh it manually

#### _SSR_

- If u made any request to the server side component the request going to server & server fetch the necessary data for it then generate the html css & js on the client side in the browser & then it going to first render the non intractive version of the site eg. html & css & then js will be added
- Until all the components are not downloaded in the client side browser react will not hydrate the component

#### error.jsx

- It is client component
- If error occcur in the perticular portion of the page it will not break the whole UI it just brak perticular portion
- It take 2 props error and reset



## Route Groups

- In the app directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a Route Group to prevent the folder from being included in the route's URL path.
- This allows you to organize your route segments and project files into logical groups without affecting the URL path structure
  A route group can be created by wrapping a folder's name in parenthesis: `(folderName)`
- This indicates the folder is for organizational purposes and should not be included in the route's URL path.

Note:- The naming of route groups has no special significance other than for organization. They do not affect the URL path

## Private Folders

- Private folders can be created by prefixing a folder with an underscore: `_folderName`
- This indicates the folder is a private implementation detail and should not be considered by the routing system, thereby opting the folder and all its subfolders out of routing.
- It can be useful for:
  - Separating UI logic from routing logic.
  - Consistently organizing internal files across a project and the Next.js ecosystem
  - Sorting and grouping files in code editors.
  - Avoiding potential naming conflicts with future Next.js file conventions.

## Module Path Aliases

- Next.js supports Module Path Aliases which make it easier to read and maintain imports across deeply nested project files.

Note:- `@/` indicate the root directory

## Dynamic Routes

- When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or prerendered at build time then use the Dynamic routes
- A Dynamic Segment can be created by wrapping a folder's name in square brackets: `[folderName]`. For example, `[id]` or `[slug]`.
- Dynamic Segments are passed as the params prop to layout, page, route, and generateMetadata functions.

### Catch-all Segments

- Dynamic Segments can be extended to catch-all subsequent segments by adding an ellipsis inside the brackets [...folderName]
- app/shop/[...slug]/page.js result will be ==> /shop/a

## Optional Catch-all Segments

- Catch-all Segments can be made optional by including the parameter in double square brackets: [[...folderName]].

#### Note:- The difference between catch-all and optional catch-all segments is that with optional, the route without the parameter is also matched.

- app/shop/[[...slug]]/page.js result will be ==> /shop {}
- app/shop/[[...slug]]/page.js result will be ==> /shop/a

## Parallel Routes

- Parallel Routes allows you to simultaneously or conditionally render one or more pages within the same layout. They are useful for highly dynamic sections of an app, such as dashboards and feeds on social sites.
- Parallel routes are created using named slots. Slots are defined with the @folder convention. For example, @analytics and @team
- Slots are passed as props to the shared parent layout i.e component in app/layout.js now accepts the @analytics and @team slots props, and can render them in parallel alongside the children prop:

Note:- slots are not route segments and do not affect the URL structure

By default, Next.js keeps track of the active state (or subpage) for each slot
-You can define a default.js file to render as a fallback for unmatched slots during the initial load or full-page reload.

## Route Handlers

- Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.
- Route Handlers are defined in a route.js|ts file inside the app directory
- Route Handlers can be nested inside the app directory, similar to page.js and layout.js. But there cannot be a route.js file at the same route segment level as page.js
- The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. If an unsupported method is called, Next.js will return a 405 Method Not Allowed response
- Using the Request object with the GET method.

# Middleware

- Use the file middleware.js|ts in the root of your project to define Middleware.
- Middleware allows you to run code before a request is completed.
- Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.
- Middleware runs before cached content and routes are matched
- Integrating Middleware into your application can lead to significant improvements in performance, security, and user experience.
- Middleware will be invoked for every route in your project
- Middleware is particularly effective include in some scenarios
  - Authentication and Authorization: Ensure user identity and check session cookies before granting access to specific pages or API routes.
  - Path Rewriting
  - Server-Side Redirects: Redirect users at the server level based on certain conditions

Note:- While only one middleware.js file is supported per project but you can still organize your middleware logic modularly Break out middleware functionalities into separate .js files and import them into your main middleware.js. By enforcing a single middleware file, it simplifies configuration, prevents potential conflicts, and optimizes performance by avoiding multiple middleware layers.

#### Matcher

- matcher allows you to filter Middleware to run on specific paths.
- You can match a single path or multiple paths with an array syntax
