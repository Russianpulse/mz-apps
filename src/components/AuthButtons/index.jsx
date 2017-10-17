const React = require('react');
const ReactDOM = require('react-dom');
import Button from 'material-ui/Button';

class AuthButtons extends React.Component {
  render() {
    return <div>
      <Button raised>
      Facebook
      </Button>
    </div>;
  }
}

export default AuthButtons;
