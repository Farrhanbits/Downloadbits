'use client';

import React from 'react';
import LightRays from './LightRays';

export const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Top Banner Interactive WebGL Light Rays (React Bits style) */}
      <div className="absolute top-0 left-0 right-0 h-[650px] w-full z-0 opacity-85">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* Primary Violet Aurora Orb */}
      <div 
        className="absolute -top-[10%] left-[25%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[150px] animate-aurora-spin" 
      />

      {/* Secondary Purple Glow Orb */}
      <div 
        className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/15 blur-[160px] animate-pulse-slow" 
      />

      {/* Subtle Mesh Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
      />
    </div>
  );
};
