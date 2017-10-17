const React = require('react');
const ReactDOM = require('react-dom');

const hz = Horizon({authType: 'anonymous'});
hz.connect();

const COLLECTION = 'mz_comments';

class Comment extends React.Component {
  render() {
    return <div>{this.props.comment}</div>;
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
        <textarea cols="80" rows="5" value={this.state.comment} onChange={this.handleChange} ></textarea>
        <button>Submit</button>
      </form>;
  }

  handleSubmit(e) {
    e.preventDefault();
    hz(COLLECTION).store({ objectId: this.props.objectId, comment: this.state.comment });
    this.setState({ comment: '' });
  }

  handleChange(e) {
    this.setState({ comment: e.target.value });
  }
}


export class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };
  }

  render() {
    return <div>
      <h2>Comments</h2>
      {this.comments()}

      <Form objectId={this.props.uuid} />
      </div>;
  }

  componentDidMount() {
    hz.aggregate({
      comments: hz(COLLECTION).findAll({objectId: this.props.uuid})
    }).watch().subscribe(data => {
      this.setState({comments: data.comments});
    });
  }

  comments() {
    return this.state.comments.map(function(el) {
      return <Comment key={el.id} comment={el.comment} />;
    })
  }
}

export default Comments;

