import React from "react";
import Particles from "react-particles-js";

const ParticlesJs = () => {
  return (
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
  );
};

export default ParticlesJs;
