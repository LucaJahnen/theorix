# Theorix - music theory
Theorix helps you understand music theory in no time. Check out our articles and interactive tools to test your knowledge.

If you want to support this project, feel free to donate:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E2168I60)

## My Process
I wanted to create a real web application so I combined my two hobbies: Music and programming. After figuring out which tools I would need I started developing. First, I found a tool called [react-vexflow](https://github.com/markacola/react-vexflow) but due to it's limited functionality, I had to rely on vexflow itself. I also wanted to use ShadcnUi so I used tailwind as well even though I never used it before. ShadcnUi offers great components but I don't like the tailwind approach because now html elements and styling is in done in the same file again.

## SPAs and Performance
For this project I used React to create a Single Page Application (SPA). This may lead to performance issues because the whole document is requested at once. To address this issue I implmented [lazy loading](https://react.dev/reference/react/lazy) so now, each page is only request ed when it's needed.

```js
import { Suspense, lazy } from 'react'

const App = lazy(() => import('./App'))
const Error = lazy(() => import('./pages/error'))

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<p>Loading...</p>}>
            <App />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<p>Loading...</p>}>
          <Error />
        </Suspense>
      )
    },
   ...
])
```

## Assets
- [ShadcnUi](https://ui.shadcn.com/): ShadcnUi allowed me to spend more time on developing tools and writing articles instead of messing with buttons or FAQ sections
- [Vexflow](https://www.vexflow.com/): Vexflow makes creating clefs and writing sheet music on the web
effortless
- [React Helmet](https://www.npmjs.com/package/react-helmet): React Helmet allows to to easily add title and meta descriptions for every page
- [Rive](https://rive.app/): I am no designer but by using Rive I was able to create a good-looking hero illustration
**Note:** These are only some dependencies I wanted to mention
