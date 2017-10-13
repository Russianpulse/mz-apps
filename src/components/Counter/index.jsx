const React = require('react');
const ReactDOM = require('react-dom');

const hz = Horizon({authType: 'anonymous'});
hz.connect();

const COLLECTION = 'mz_views';

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    hz.aggregate({
      views: hz(COLLECTION).findAll({objectId: this.props.uuid}),
      currentUser: hz.currentUser()
    }).watch().subscribe(data => {
      this.setState({count: data.views.length, currentUser: data.currentUser});
      this.increment();
    });
  }

  increment() {
    var view = {
      id: this.viewId(),
      objectId: this.props.uuid,
      userId: this.state.currentUser.id
    };

    hz(COLLECTION).store(view);
  }

  render() {
    if (this.state.count !== undefined) {
      return <div>{this.state.count}
        &nbsp;<i className='fa fa-eye'></i>
      </div>;
    } else {
      return <div />;
    }
  }

  viewId() {
    return this.props.uuid + this.state.currentUser.id;
  }
}

export default Counter;
