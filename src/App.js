import logo from "./assets/Logo.png";
import visPanel from "./assets/visPanel.svg";
import twoPpl from "./assets/tw.png"
import './App.css';

const TwoPplWrapper = () => {
  return (
    <img src={twoPpl} aria-hidden="true"/>
  );
}

const App = () => {
  return (
    <div>
      <div className={"logoContainer"}>
        <img src={logo} alt={"nexus logo"}/>
      </div>
      <h1>Coming soon to UW students!</h1>
      <div className={"container"}>
        <TwoPplWrapper />
        <p className={"bodyText"}>At the University of Washington, those who are unable to find internships still need to find resume-worthy experiences to remain competitive with their peers. By joining the NEXUS network, you will be able to find intriguing projects as a team member or motivated students as a project manager. We look forward to helping the UW student community and make sure to check out some of our designs below!</p>
        <TwoPplWrapper />
      </div>
      <h1>Get notified when we launch</h1>
      {/* email submission */}
      <img src={visPanel} aria-hidden={"true"} className={"visualPanel"}/>
      <h1>Check out our designs!</h1>
    </div>
  );
}

export default App;
