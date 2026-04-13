import React from 'react';

type Traits = {
  ruleVsAuto: 'R' | 'A';
  logicalVsEmpathetic: 'L' | 'E';
  cautiousVsCreative: 'C' | 'D';
  systemVsUser: 'S' | 'U';
};

export default function AnimatedArchetype({ traits, color }: { traits: Traits, color: string }) {
  const isRule = traits.ruleVsAuto === 'R';
  const isEmpath = traits.logicalVsEmpathetic === 'E';
  const isCreative = traits.cautiousVsCreative === 'D';
  
  const pulseDuration = isEmpath ? "4s" : "1.5s";
  const orbitSpeed = isCreative ? "3s" : "10s";
  const orbitDistance = isCreative ? 180 : 100;
  
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-[80%] max-w-[400px] h-auto drop-shadow-2xl">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <filter id="glowF" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background glow */}
        <circle cx="200" cy="200" r={orbitDistance} fill="url(#coreGlow)">
          <animate attributeName="r" values={`${orbitDistance};${orbitDistance*1.2};${orbitDistance}`} dur={pulseDuration} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur={pulseDuration} repeatCount="indefinite" />
        </circle>

        {/* Outer Orbital Rings */}
        <g stroke={color} strokeWidth="1" fill="none" opacity="0.3">
          <circle cx="200" cy="200" r="140" strokeDasharray={isCreative ? "10,20" : "4,4"} />
          <circle cx="200" cy="200" r="160" strokeDasharray={isRule ? "0" : "20,40"} opacity="0.1" />
        </g>

        {/* Orbiting Satellites */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur={orbitSpeed} repeatCount="indefinite" />
          <circle cx={200} cy={200 - orbitDistance} r="4" fill="#fff" filter="url(#glowF)" />
          <circle cx={200} cy={200 + orbitDistance} r="3" fill={color} filter="url(#glowF)" />
          {isCreative && (
            <circle cx={200 - orbitDistance} cy={200} r="5" fill="#fff" filter="url(#glowF)" />
          )}
        </g>

        {/* Core Shape Based on Rule vs Auto */}
        {isRule ? (
          <g filter="url(#glowF)">
            <polygon points="200,120 280,200 200,280 120,200" fill="transparent" stroke={color} strokeWidth="4">
              <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
            </polygon>
            <polygon points="200,140 260,200 200,260 140,200" fill="transparent" stroke="#fff" strokeWidth="2" opacity="0.6">
              <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="15s" repeatCount="indefinite" />
            </polygon>
          </g>
        ) : (
          <g filter="url(#glowF)">
            <circle cx="200" cy="200" r="70" fill="transparent" stroke={color} strokeWidth="3" strokeDasharray="30, 10">
              <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="-360 200 200" dur="15s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="200" r="50" fill="transparent" stroke="#fff" strokeWidth="2" strokeDasharray="15, 15">
              <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="8s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* The Heart / Center */}
        <circle cx="200" cy="200" r="20" fill={color} filter="url(#glowF)">
           <animate attributeName="r" values="18;24;18" dur={pulseDuration} repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="200" r="8" fill="#fff" />
        
        {/* Render Metrics text so it looks like a technical visualization, not a loader */}
        <text x="35" y="375" fill={color} fontSize="10" fontFamily="monospace" opacity="0.6">
          ARCHETYPE :: RENDERED
        </text>
        <text x="35" y="390" fill="#fff" fontSize="10" fontFamily="monospace" opacity="0.4">
          LATENCY: 0.04ms | STATUS: STABLE
        </text>
      </svg>
    </div>
  );
}
