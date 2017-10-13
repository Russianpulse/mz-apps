const React = require('react');
const ReactDOM = require('react-dom');
import Counter from './components/Counter/index.jsx'

function App() {
  return <div>
    <Counter uuid="http://russianpulse.ru/post/234"/>
  </div>;
}

ReactDOM.render(
  <App/>, document.getElementById('app'));
