import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "@tsparticles/engine";

export default function BaseConfetti() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="baseConfetti"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 1
        },
        particles: {
          number: {
            value: 0
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "image",
            image: {
              src: "/design/Base Logo.png",
              width: 32,
              height: 32
            }
          },
          opacity: {
            value: 1
          },
          size: {
            value: 24,
            random: {
              enable: true,
              minimumValue: 12
            }
          },
          move: {
            enable: true,
            speed: 10,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out"
            }
          }
        },
        emitters: {
          position: {
            x: 50,
            y: 50
          },
          rate: {
            delay: 0,
            quantity: 10
          },
          size: {
            width: 0,
            height: 0
          }
        }
      }}
    />
  );
} 