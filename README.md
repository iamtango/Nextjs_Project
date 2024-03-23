# My NextJs Learning by using the App Router

## next Jsis fullStack framework so to write the backend we write it in the api folder and here we write route.js file

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
