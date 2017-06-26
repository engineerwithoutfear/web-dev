//stardate 2263.02
//User Story: I can type text to be translated into a text area.
//User Story: I can see a preview of the translated output that is updated as I type.

const InputPanel = props =>
  <div className="markdown">
    <textarea
      placeholder={props.placeholderMarkdown}
      onChange={props.updateState}
      value={props.text}
      // autoFocus
    />
  </div>;

const OutputPanel = props =>
  <div className={"preview"}>

    <div className={props.placeholderPreview ? "screensaver" : "hide-me"}>
      <img
        className="ufp"
        src="https://engineerwithoutfear.github.io/web_dev/FreeCodeCamp/galactic-translator-react/css/UFP_Emblem.svg"
      />
    </div>
    <div className="previewText">
      {" "}<div className={props.language}>
        <div dangerouslySetInnerHTML={{ __html: marked(props.text) }} />
      </div>
    </div>
  </div>;

const Header = () =>
  <header>
    <div className="header-text">
      <span className="header-text-1 insets">COMMAND CONSOLE: 09182</span>
      <span className="header-text-2">USER: S 179-276 SP</span>
    </div>
  </header>;

const LanguageMenu = props =>
  <div className="language-menu" onClick={props.onClick}>
    <div className="language-select">
      <div className="language-select-text">
        <span className="language-select-text-1 insets">
          TRANSLATION LANGUAGE
        </span>
      </div>
    </div>
    <div className="language-current">
      <div className="language-current-text">
        <span className="language-current-text-1 insets">{props.language}</span>
      </div>
    </div>
  </div>;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderMarkdown: "Terminal ready.",
      placeholderPreview: true,
      languages: [
        "vulcan",
        "romulan",
        "klingon",
        "borg",
        "ferengi",
        "dominion"
      ],
      index: 0,
      language: "",
      text: ""
    };

    this.updateState = this.updateState.bind(this);
    this.selectLanguage = this.selectLanguage.bind(this);
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.selectLanguage();
  }
  updateState(e) {
    this.setState({
      text: e.target.value,
      placeholderPreview: false
    });
  }
  selectLanguage() {
    this.setState({ language: this.state.languages[this.state.index] });
  }
  updateLanguage() {
    this.setState(
      {
        index: this.state.index >= this.state.languages.length - 1
          ? 0
          : this.state.index + 1
      },
      this.selectLanguage
    );
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="display-panel">
          <InputPanel
            placeholderMarkdown={this.state.placeholderMarkdown}
            updateState={this.updateState}
            value={this.state.text}
          />
          <OutputPanel
            placeholderPreview={this.state.placeholderPreview}
            text={this.state.text}
            language={this.state.language}
          />
        </div>
        <LanguageMenu
          onClick={this.updateLanguage}
          language={this.state.language}
        />
      </div>
    );
  }
}

// render all the things
ReactDOM.render(<App />, document.getElementById("container-react"));
