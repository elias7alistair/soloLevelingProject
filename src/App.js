import Particles from "react-particles-js";
import "./App.scss";

function App() {
  return (
    <div className='app'>
      <Particles
        className='particles'
        width='100vw'
        height='100vh'
        params={{
          particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 500,
              },
            },
          },
        }}
      />
      <h1>Solo Leveling</h1>
    </div>
  );
}

export default App;
