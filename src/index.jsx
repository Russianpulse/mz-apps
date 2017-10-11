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
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    likes.findAll({uuid: this.props.uuid}).watch().subscribe(data => {
      this.setState({count: data.length})
    });
  }

  render() {
    return <button onClick={this.handleClick}>Like {this.state.count}</button>;
  }

  handleClick(e) {
    e.preventDefault();
    likes.store({uuid: this.props.uuid, id: new Date()})
  }
}

function App() {
  return <div>
    <LikeButton uuid="http://russianpulse.ru/post/123"/>
    <LikeButton uuid="http://russianpulse.ru/post/234"/>
  </div>;
}

ReactDOM.render(
  <App/>, document.getElementById('app'));
