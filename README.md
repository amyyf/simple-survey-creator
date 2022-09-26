# Simple Survey Creator UI

A simplified prototype version of a survey authoring tool.

## Notes

Don't refresh your tab! In the interest of time and focusing on frontend/UX, I did not build out a database for this application. I've indicated with some comments and console logs where I envision CRUD operations happening.

I've also made the main decisions about packages with time constraints in mind: [Create React App](https://create-react-app.dev/), [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/), and [Tailwind](https://tailwindcss.com/) all allowed this project to get up and running quickly.

### Ideas for Future Improvements

- A database! So surveys can be, uh, saved. I've worked with Prisma ORM recently and found it pretty easy to use along with React Query to add a caching layer. Being able to create and save multiple surveys also raises questions of accounts and user management. We'd definitely also need form validation. Bringing in a library like [Formik](https://formik.org/) would probably be a good idea.
- In this imaginary world of multiple surveys, the layout of the application would need to change. The home page could be a list of existing surveys and the ability to create a new one. We'd need routing.
- The ability to export surveys, or mark them as complete, so a user could actually complete one.
- As the application grows, testing would become important.
- Refine UI design, add Storybook for a component library, and consider moving away from Tailwind for easier readability of CSS in the future.
- There are some security issues in the dependencies, which I believe arose when I added react-beautiful-dnd. Running `npm audit fix --force` as suggested seemed to roll back a bunch of versions and gave me even more vulnerabilities, which was ultimately not very helpful. I also had to disable Strict Mode to get this package working. These are mostly development issues but we don't want vulnerabilities or exploitabilities in a production application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
