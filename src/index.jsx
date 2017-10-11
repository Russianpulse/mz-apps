const React = require('react');
const ReactDOM = require('react-dom');

const horizon = Horizon();
horizon.connect();

const likes = horizon("likes");

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    likes.watch().subscribe(allLikes => {
      this.setState({count: allLikes.length})
    });
  }

  render() {
    return <button onClick={this.handleClick}>Like +{this.state.count}</button>;
  }

  handleClick(e) {
    e.preventDefault();
    likes.store({id: new Date()})
  }
}

function App() {
  return <div><LikeButton/></div>

}

ReactDOM.render(
  <App/>, document.getElementById('app'));
