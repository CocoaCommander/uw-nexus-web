# UW Nexus Web

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the Frontend Locally
### Initial Setup & .env file
1. Clone the repository:
```
git clone https://github.com/UW-Nexus-Dev-Team/uw-nexus-web.git
```
2. Install all dependencies: 
```
npm install
```
3. Create a .env file in the main directory
```
touch .env
```
4. Copy .env file contents from the NEXUS shared google drive and paste it into the newly created .env file
- https://drive.google.com/file/d/1qN7lrPIjZ3qiX9qbrirysitb0Uej2Qxp/view?usp=sharing

5. Download the _redirects file from the NEXUS shared google drive and place it inside the `public` folder in your project directory
- https://drive.google.com/file/d/17bJgyrffH6qJSi8J6Ht1MUMEElXzpzqk/view?usp=sharing

### Standard Use:
1. Start your react app in development mode: 
```
netlify dev
```


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