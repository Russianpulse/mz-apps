const React = require('react');
const ReactDOM = require('react-dom');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import AuthButtons from '../AuthButtons/index.jsx'

const hz = Horizon({authType: 'token'});
hz.connect();

const COLLECTION = 'mz_comments';

class Comment extends React.Component {
  render() {
    return <Card>
      <CardContent>
      <Typography component="p">
      {this.props.comment}
      </Typography>
      </CardContent>
      </Card>;
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

      <TextField
        label="Place your comment here"
        multiline
        rows="5"
        rowsMax="10"
        margin="normal"
        value={this.state.comment}
        fullWidth
        onChange={this.handleChange}
        />

        <br />
        <Button onClick={this.handleSubmit} color="primary" raised>Send</Button>
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

      <AuthButtons />
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

