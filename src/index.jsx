const React = require('react');
const ReactDOM = require('react-dom');
import Counter from './components/Counter/index.jsx'
import Comments from './components/Comments/index.jsx'

function App() {
  return <div>
    <Comments uuid="http://russianpulse.ru/post/234"/>
  </div>;
}

ReactDOM.render(
  <App/>, document.getElementById('app'));
