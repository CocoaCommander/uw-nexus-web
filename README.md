# UW Nexus Web

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Best Practices/Styling

### New Features

1. Create a new branch with `git checkout -b YOUR_BRANCH_NAME`
2. Naming convention for branches for this project should be `name_feature`, eg `jane_filled_button`
3. Once you are satisfied with your work, raise a pull request [here](https://github.com/CocoaCommander/uw-nexus-web/pulls) by clicking new pull request and asking to merge your branch into main
4. Pull requests should briefly detail what was changed / implemented
5. Assign somebody to review your branch for approval before merging (this is just a school project though so it doesn't really matter)

### Code Style Best Practices
- Whatever style we choose, we need to remain consistent
- Use arrow functions when possible eg `const my_func = () => return (<p>So true<p>)`
- Break down props in the parameters of each functional component eg

```
<MyComponent isOn={true} onClick={onClickHandler} />

/**/

export const MyComponent = ({
	isOn,
	onClick
	}) => { ... }
```

- Try to use functional components if possible, they're a lot easier to read and write

### File Structure

- Pages are located in the `Pages` folder in `src`
- The components that make up each page are located in the `Components` folder in `src`
- Components and pages should be named with the `.jsx` extension to denote that they contain UI elements
- Any helper functions should be declared in files with the `.js` extension to denote that they contain logical/control functions