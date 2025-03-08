// "use client";
// import { useCallback } from "react";
// import { Particles } from "@tsparticles/react"; // ✅ Correct
// import { loadFull } from "tsparticles";
// import type { Engine } from "tsparticles-engine";
// import "../styles/style.css"

// const ParticlesBackground = () => {
//   const particlesInit = useCallback(async (engine: Engine) => {
//     await loadFull(engine);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         fullScreen: { enable: true }, // Covers the full screen
//         particles: {
//           number: { value: 100, density: { enable: true, width: 800, height: 800 } },
//           shape: { type: "circle" },
//           size: { value: {min:1, max:4} },
//           move: { enable: true, speed: 1, direction: "none", outModes: "bounce" },
//           line_linked: { enable: false },
//           opacity: { value: 0.8 },
//           color: { value: "#ffffff" },
//         },
//         interactivity: {
//           events: {
//             onHover: { enable: true, mode: "repulse" }, // Dots push away when hovered
//             onClick: { enable: false },
//           },
//           modes: {
//             repulse: { distance: 100, duration: 0.4 }, // Push effect on hover
//           },
//         },
//         background: { color: "#000000" }, // Dark background for contrast
//       }}
//     />
//   );
// };

// export default ParticlesBackground;
