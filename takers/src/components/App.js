import './App.css';
import LeftPanel from './LeftPanel';
import TopPanel from './TopPanel';
import ExamArea from './ExamArea';

function App() {
  return (
    <div className="App">
      <TopPanel/>
      <LeftPanel/>
      <ExamArea exam_id="exam0"/>
    </div>
  );
}

export default App;
