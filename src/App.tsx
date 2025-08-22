import './index.css';
import GitHubLogo from '/github-logo.png';
import DisplayStudentNames from './components/DisplayStudentNames';

function App() {
  return(
    <>
    <header>
        <nav className="navbar">
            <img src={GitHubLogo} alt="GitHub Logo"  className='logo'/>
            <h1>GitHub Campus Club</h1>
        </nav>
    </header>

    <main>
        <section className="welcome-section">
            <h2>Git Started: Unlocking the World of Code and Open Source</h2>
            <p>Exclusive to First Years</p>
        </section>

        <section className="git-commands">
            <h3>Essential Git Commands</h3>
            <ul>
                <li><strong>git init</strong> – Start a new Git repository</li>
                <li><strong>git clone</strong> – Clone an existing repo</li>
                <li><strong>git add</strong> – Stage changes</li>
                <li><strong>git commit</strong> – Save your changes</li>
                <li><strong>git push</strong> – Push to a remote repository</li>
                <li><strong>git pull</strong> – Pull from a remote repository</li>
            </ul>
        </section>
        <DisplayStudentNames/>
      </main>
    </>
  )
}

export default App
