const React = require('react');
const ReactDOM = require('react-dom');
import Button from 'material-ui/Button';

class AuthButtons extends React.Component {
  render() {
    return <div>
      <Button raised onClick={this.handleFacebook}>
        Facebook
      </Button>
    </div>;
  }

  handleFacebook() {
    alert('facebook');
  }
}

export default AuthButtons;
