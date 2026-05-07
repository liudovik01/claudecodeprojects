import { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Environment, Float } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

const ZONES = [
  {
    id: 'cargo',
    label: 'Cargo Surveys',
    full: 'Cargo Damage & Condition Surveys',
    desc: 'Attendance for visible damage, shortage, contamination, temperature-related issues, and condition verification across all cargo types at Baltic ports.',
    color: '#f4c95d',
    dotPos: [1.8, 1.4, 0],
    meshes: ['hatch1', 'hatch2', 'hold1', 'hold2'],
  },
  {
    id: 'hatch',
    label: 'Hatch Cover Testing',
    full: 'Hatch Cover Ultrasonic Testing',
    desc: 'Hatch cover integrity surveys using ultrasonic chalk testing to detect water-ingress risk before voyage commencement.',
    color: '#60a5fa',
    dotPos: [-0.4, 1.4, 1.1],
    meshes: ['hatch3', 'hold3'],
  },
  {
    id: 'vessel',
    label: 'Vessel Surveys',
    full: 'Vessel Survey Attendance',
    desc: 'Attendance in connection with on/off hire, loading, discharge, vessel condition, and holds inspection across Baltic terminals.',
    color: '#4ade80',
    dotPos: [3.6, 0.5, 1.1],
    meshes: ['hull', 'bow'],
  },
  {
    id: 'draft',
    label: 'Draft & Bunker',
    full: 'Draft, Bunker & Quantity Surveys',
    desc: 'Quantity-related survey support covering draft surveys, bunker matters and other quantity work at Baltic ports.',
    color: '#fb923c',
    dotPos: [-2.0, 0.3, 1.2],
    meshes: ['draft'],
  },
  {
    id: 'reefer',
    label: 'Reefer Surveys',
    full: 'Reefer & Temperature Surveys',
    desc: 'Survey attendance for reefer cargo, temperature-sensitive shipments and cold chain-related matters.',
    color: '#c084fc',
    dotPos: [0.6, 1.6, -1.1],
    meshes: ['reefer1', 'reefer2'],
  },
  {
    id: 'claims',
    label: 'Claims Adjusting',
    full: 'Claims Adjusting & Insurance Support',
    desc: 'Factual investigation, mitigation review, liability documentation, and expert attendance for cargo and transport claims.',
    color: '#f87171',
    dotPos: [-3.6, 2.4, 0],
    meshes: ['bridge', 'bridgeTop', 'bridgeLevel2'],
  },
]

function getZoneForMesh(meshName) {
  return ZONES.find(z => z.meshes.includes(meshName)) || null
}

// ─── Ship geometry ───────────────────────────────────────────────────────────

function ShipMesh({ name, position, rotation, geometry, material, onClick, onPointerOver, onPointerOut }) {
  const ref = useRef()
  return (
    <mesh
      ref={ref}
      name={name}
      position={position}
      rotation={rotation}
      geometry={geometry}
      material={material}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(name) }}
      onPointerOver={(e) => { e.stopPropagation(); onPointerOver && onPointerOver(name) }}
      onPointerOut={(e) => { e.stopPropagation(); onPointerOut && onPointerOut() }}
    />
  )
}

function CargoShip({ activeZone, onMeshClick, onMeshHover }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.06
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.008
    }
  })

  function mat(color, roughness = 0.7, metalness = 0.3, emissive = '#000000', emissiveIntensity = 0) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness, emissive, emissiveIntensity })
  }

  function isActive(meshName) {
    if (!activeZone) return false
    const zone = getZoneForMesh(meshName)
    return zone && zone.id === activeZone
  }

  function hullMat(meshName) {
    const zone = getZoneForMesh(meshName)
    const active = isActive(meshName)
    const baseColor = '#182c4a'
    return mat(
      active && zone ? zone.color : baseColor,
      0.75, 0.4,
      active && zone ? zone.color : '#000000',
      active ? 0.3 : 0
    )
  }

  function hatchMat(meshName) {
    const zone = getZoneForMesh(meshName)
    const active = isActive(meshName)
    return mat(
      active && zone ? zone.color : '#3d4e63',
      0.5, 0.6,
      active && zone ? zone.color : '#000000',
      active ? 0.4 : 0
    )
  }

  function bridgeMat(meshName) {
    const zone = getZoneForMesh(meshName)
    const active = isActive(meshName)
    return mat(
      active && zone ? zone.color : '#d8e4f0',
      0.4, 0.1,
      active && zone ? zone.color : '#000000',
      active ? 0.3 : 0
    )
  }

  function reeferMat(meshName) {
    const zone = getZoneForMesh(meshName)
    const active = isActive(meshName)
    return mat(
      active && zone ? zone.color : '#8facc8',
      0.6, 0.2,
      active && zone ? zone.color : '#000000',
      active ? 0.35 : 0
    )
  }

  const props = { onClick: onMeshClick, onPointerOver: onMeshHover, onPointerOut: () => {} }

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>

      {/* ── Hull body ─────────────────────────────────────── */}
      <ShipMesh name="hull" position={[0, 0, 0]}
        geometry={new THREE.BoxGeometry(8, 1.1, 2)}
        material={hullMat('hull')} {...props} />

      {/* Bow taper */}
      <ShipMesh name="bow" position={[4.2, -0.02, 0]} rotation={[0, 0, 0]}
        geometry={(() => {
          const g = new THREE.CylinderGeometry(0, 0.6, 1.8, 4, 1)
          g.rotateZ(-Math.PI / 2)
          g.rotateY(Math.PI / 4)
          return g
        })()}
        material={hullMat('bow')} {...props} />

      {/* Red boot-topping (below waterline) */}
      <mesh position={[0, -0.42, 0]}>
        <boxGeometry args={[8.05, 0.28, 2.05]} />
        <meshStandardMaterial color="#5c1a1a" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Keel stripe */}
      <mesh position={[0, -0.58, 0]}>
        <boxGeometry args={[8, 0.06, 0.3]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>

      {/* Main deck */}
      <mesh position={[0, 0.57, 0]}>
        <boxGeometry args={[8, 0.06, 2]} />
        <meshStandardMaterial color="#22334d" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Forecastle (raised bow deck) */}
      <mesh position={[3.3, 0.82, 0]}>
        <boxGeometry args={[1.5, 0.5, 2]} />
        <meshStandardMaterial color="#1e2e45" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[3.3, 1.1, 0]}>
        <boxGeometry args={[1.5, 0.06, 2]} />
        <meshStandardMaterial color="#1a2840" roughness={0.9} />
      </mesh>

      {/* ── Cargo holds ───────────────────────────────────── */}
      <ShipMesh name="hold1" position={[1.9, 0.78, 0]}
        geometry={new THREE.BoxGeometry(1.6, 0.4, 1.65)}
        material={hullMat('hold1')} {...props} />

      <ShipMesh name="hold2" position={[0.15, 0.78, 0]}
        geometry={new THREE.BoxGeometry(1.6, 0.4, 1.65)}
        material={hullMat('hold2')} {...props} />

      <ShipMesh name="hold3" position={[-1.55, 0.78, 0]}
        geometry={new THREE.BoxGeometry(1.4, 0.4, 1.65)}
        material={hullMat('hold3')} {...props} />

      {/* ── Hatch covers ──────────────────────────────────── */}
      <ShipMesh name="hatch1" position={[1.9, 1.02, 0]}
        geometry={new THREE.BoxGeometry(1.5, 0.07, 1.55)}
        material={hatchMat('hatch1')} {...props} />

      {/* Hatch panel lines */}
      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={i} position={[1.9 + x * 0.48, 1.06, 0]}>
          <boxGeometry args={[0.02, 0.02, 1.5]} />
          <meshStandardMaterial color="#2a3a50" />
        </mesh>
      ))}

      <ShipMesh name="hatch2" position={[0.15, 1.02, 0]}
        geometry={new THREE.BoxGeometry(1.5, 0.07, 1.55)}
        material={hatchMat('hatch2')} {...props} />

      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={i} position={[0.15 + x * 0.48, 1.06, 0]}>
          <boxGeometry args={[0.02, 0.02, 1.5]} />
          <meshStandardMaterial color="#2a3a50" />
        </mesh>
      ))}

      <ShipMesh name="hatch3" position={[-1.55, 1.02, 0]}
        geometry={new THREE.BoxGeometry(1.3, 0.07, 1.55)}
        material={hatchMat('hatch3')} {...props} />

      {[-0.4, 0, 0.4].map((x, i) => (
        <mesh key={i} position={[-1.55 + x * 0.44, 1.06, 0]}>
          <boxGeometry args={[0.02, 0.02, 1.5]} />
          <meshStandardMaterial color="#2a3a50" />
        </mesh>
      ))}

      {/* ── Reefer containers on deck ─────────────────────── */}
      <ShipMesh name="reefer1" position={[1.0, 1.28, -0.55]}
        geometry={new THREE.BoxGeometry(0.9, 0.45, 0.45)}
        material={reeferMat('reefer1')} {...props} />
      <ShipMesh name="reefer2" position={[0.0, 1.28, -0.55]}
        geometry={new THREE.BoxGeometry(0.9, 0.45, 0.45)}
        material={reeferMat('reefer2')} {...props} />

      {/* Reefer unit details */}
      {[1.0, 0.0].map((x, i) => (
        <mesh key={i} position={[x, 1.28, -0.78]}>
          <boxGeometry args={[0.85, 0.4, 0.02]} />
          <meshStandardMaterial color="#6a8fac" roughness={0.3} metalness={0.5} />
        </mesh>
      ))}

      {/* Draft marks (invisible clickable zone) */}
      <ShipMesh name="draft" position={[0, -0.1, 1.02]}
        geometry={new THREE.BoxGeometry(7.5, 0.8, 0.05)}
        material={new THREE.MeshStandardMaterial({ transparent: true, opacity: 0 })}
        {...props} />

      {/* Draft number marks */}
      {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[i * 1.0, -0.1 + (i % 2) * 0.1, 1.03]}>
          <boxGeometry args={[0.08, 0.12, 0.01]} />
          <meshStandardMaterial color="#e8c47a" roughness={0.5} />
        </mesh>
      ))}

      {/* Waterline stripe */}
      <mesh position={[0, -0.25, 1.02]}>
        <boxGeometry args={[8, 0.06, 0.01]} />
        <meshStandardMaterial color="#e8c47a" roughness={0.5} />
      </mesh>

      {/* ── Superstructure / Bridge ───────────────────────── */}
      {/* Base block */}
      <ShipMesh name="bridge" position={[-3.1, 1.28, 0]}
        geometry={new THREE.BoxGeometry(2.0, 1.42, 1.95)}
        material={bridgeMat('bridge')} {...props} />

      {/* Level 2 */}
      <ShipMesh name="bridgeLevel2" position={[-3.0, 2.32, 0]}
        geometry={new THREE.BoxGeometry(1.8, 0.82, 1.85)}
        material={bridgeMat('bridgeLevel2')} {...props} />

      {/* Bridge wings / wheelhouse */}
      <ShipMesh name="bridgeTop" position={[-2.9, 2.98, 0]}
        geometry={new THREE.BoxGeometry(1.6, 0.42, 2.2)}
        material={bridgeMat('bridgeTop')} {...props} />

      {/* Windows on bridge */}
      {[-0.55, -0.18, 0.18, 0.55].map((z, i) => (
        <mesh key={i} position={[-2.08, 1.55, z]}>
          <boxGeometry args={[0.02, 0.28, 0.22]} />
          <meshStandardMaterial color="#b8d4ea" roughness={0.1} metalness={0.1} transparent opacity={0.7} />
        </mesh>
      ))}
      {[-0.55, -0.18, 0.18, 0.55].map((z, i) => (
        <mesh key={i} position={[-2.08, 2.55, z]}>
          <boxGeometry args={[0.02, 0.22, 0.24]} />
          <meshStandardMaterial color="#b8d4ea" roughness={0.1} metalness={0.1} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Funnel */}
      <mesh position={[-3.5, 3.55, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 0.9, 12]} />
        <meshStandardMaterial color="#182c4a" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Funnel gold band */}
      <mesh position={[-3.5, 3.82, 0]}>
        <cylinderGeometry args={[0.195, 0.195, 0.12, 12]} />
        <meshStandardMaterial color="#d4a437" roughness={0.4} metalness={0.6} emissive="#d4a437" emissiveIntensity={0.2} />
      </mesh>
      {/* Funnel top cap */}
      <mesh position={[-3.5, 4.02, 0]}>
        <cylinderGeometry args={[0.2, 0.18, 0.06, 12]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* ── Mast (forward) ────────────────────────────────── */}
      <mesh position={[2.6, 1.6, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 1.2, 6]} />
        <meshStandardMaterial color="#c0c8d4" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Cross-tree */}
      <mesh position={[2.6, 2.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 6]} />
        <meshStandardMaterial color="#c0c8d4" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* ── Crane/derrick over hold 1 ─────────────────────── */}
      <mesh position={[1.1, 1.35, 0.8]}>
        <cylinderGeometry args={[0.03, 0.04, 0.8, 6]} />
        <meshStandardMaterial color="#8a9ab0" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[1.1, 1.75, 0.6]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.55, 6]} />
        <meshStandardMaterial color="#8a9ab0" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* ── Anchor chain detail ───────────────────────────── */}
      {[0.08, -0.08].map((z, i) => (
        <mesh key={i} position={[3.8, 0.3, z]}>
          <cylinderGeometry args={[0.025, 0.025, 0.6, 4]} />
          <meshStandardMaterial color="#5a6a7a" roughness={0.8} metalness={0.4} />
        </mesh>
      ))}

      {/* ── Bollards along deck ───────────────────────────── */}
      {[-2.5, -1.0, 0.5, 2.0, 3.0].map((x, i) => (
        [0.9, -0.9].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.68, z]}>
            <cylinderGeometry args={[0.045, 0.045, 0.18, 6]} />
            <meshStandardMaterial color="#5a6a7a" roughness={0.7} metalness={0.4} />
          </mesh>
        ))
      ))}

      {/* ── Railing along deck edges ──────────────────────── */}
      {[0.95, -0.95].map((z, side) => (
        <mesh key={side} position={[0, 0.82, z]}>
          <boxGeometry args={[7.8, 0.02, 0.01]} />
          <meshStandardMaterial color="#8a9ab0" roughness={0.5} metalness={0.5} />
        </mesh>
      ))}

      {/* ── Water plane ───────────────────────────────────── */}
      <mesh position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#0a1e38" roughness={0.05} metalness={0.1} transparent opacity={0.88} />
      </mesh>

      {/* Ocean surface shimmer */}
      <mesh position={[0, -0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#1a3a5c" roughness={0.02} metalness={0.3} transparent opacity={0.2} />
      </mesh>

    </group>
  )
}

// ─── Hotspot dot ─────────────────────────────────────────────────────────────

function ZoneDot({ zone, activeZone, onActivate }) {
  const isActive = activeZone === zone.id
  return (
    <Html position={zone.dotPos} center zIndexRange={[10, 20]}>
      <div
        onClick={() => onActivate(zone.id)}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {/* Pulse ring */}
        {!isActive && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 32, height: 32, borderRadius: '50%',
            border: `2px solid ${zone.color}`,
            animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
            opacity: 0.6,
          }} />
        )}
        {/* Dot */}
        <div style={{
          width: isActive ? 18 : 13,
          height: isActive ? 18 : 13,
          borderRadius: '50%',
          background: zone.color,
          border: `2px solid rgba(255,255,255,${isActive ? 0.9 : 0.5})`,
          boxShadow: isActive ? `0 0 18px 4px ${zone.color}88` : `0 0 8px 2px ${zone.color}55`,
          transition: 'all 0.25s ease',
          position: 'relative',
        }} />
        {/* Label */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(12px, -50%)',
          background: isActive ? zone.color : 'rgba(5,11,26,0.85)',
          color: isActive ? '#0a1628' : zone.color,
          fontSize: 11, fontWeight: 700,
          fontFamily: "'Open Sans', sans-serif",
          letterSpacing: '0.06em',
          padding: '3px 8px',
          borderRadius: 4,
          whiteSpace: 'nowrap',
          border: `1px solid ${zone.color}66`,
          backdropFilter: 'blur(6px)',
          pointerEvents: 'none',
          transition: 'all 0.25s ease',
          opacity: isActive ? 1 : 0.85,
        }}>
          {zone.label}
        </div>
      </div>
    </Html>
  )
}

// ─── Info panel ──────────────────────────────────────────────────────────────

function InfoPanel({ zone, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', top: '50%', right: 32,
        transform: 'translateY(-50%)',
        width: 300,
        background: 'rgba(5,11,26,0.92)',
        border: `1px solid ${zone.color}44`,
        borderLeft: `3px solid ${zone.color}`,
        borderRadius: 12,
        padding: '24px 20px',
        backdropFilter: 'blur(16px)',
        zIndex: 30,
        boxShadow: `0 24px 48px -12px rgba(0,0,0,0.6), 0 0 40px -8px ${zone.color}22`,
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 12, right: 12,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(143,164,196,0.7)', fontSize: 18, lineHeight: 1,
          padding: '2px 6px',
        }}
      >×</button>

      {/* Zone indicator dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: zone.color, flexShrink: 0, boxShadow: `0 0 8px ${zone.color}` }} />
        <span style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: zone.color, fontWeight: 600,
        }}>Survey Zone</span>
      </div>

      <h3 style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700, fontSize: 16, color: '#e8eef7',
        marginBottom: 12, lineHeight: 1.3,
      }}>{zone.full}</h3>

      <p style={{
        fontFamily: "'Open Sans', sans-serif",
        fontSize: 13, color: '#8fa4c4', lineHeight: 1.7,
        marginBottom: 20,
      }}>{zone.desc}</p>

      <a href="#contact" onClick={onClose} style={{
        display: 'inline-block',
        padding: '9px 18px',
        background: `linear-gradient(135deg, ${zone.color}22, ${zone.color}11)`,
        border: `1px solid ${zone.color}55`,
        borderRadius: 6,
        color: zone.color,
        fontFamily: "'Open Sans', sans-serif",
        fontSize: 12, fontWeight: 700,
        letterSpacing: '0.08em',
        textDecoration: 'none',
        textTransform: 'uppercase',
        transition: 'all 0.2s',
      }}>Request Survey →</a>
    </motion.div>
  )
}

// ─── 3D Scene ────────────────────────────────────────────────────────────────

function Scene({ activeZone, onZoneActivate }) {
  const controlsRef = useRef()

  function handleMeshClick(meshName) {
    const zone = getZoneForMesh(meshName)
    if (zone) onZoneActivate(zone.id === activeZone ? null : zone.id)
  }

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 12, 8]} intensity={1.4} castShadow />
      <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#4a6fa5" />
      <pointLight position={[0, 8, 0]} intensity={0.3} color="#ffffff" />
      {/* Subtle rim light from below for drama */}
      <pointLight position={[0, -3, 3]} intensity={0.15} color="#1a4a7a" />

      <Environment preset="night" />

      <Float speed={0} rotationIntensity={0} floatIntensity={0}>
        <CargoShip
          activeZone={activeZone}
          onMeshClick={handleMeshClick}
          onMeshHover={() => {}}
        />
      </Float>

      {ZONES.map(zone => (
        <ZoneDot
          key={zone.id}
          zone={zone}
          activeZone={activeZone}
          onActivate={onZoneActivate}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 5}
        minAzimuthAngle={-Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 2.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

// ─── Hero3D export ───────────────────────────────────────────────────────────

export default function Hero3D() {
  const [activeZone, setActiveZone] = useState(null)

  const activeZoneData = ZONES.find(z => z.id === activeZone)

  function scrollToContact(e) {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      style={{
        position: 'relative', width: '100%', height: '100vh',
        minHeight: 600, background: '#050b1a', overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(20,50,100,0.4) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <Canvas
          camera={{ position: [5, 3.5, 9], fov: 42 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene activeZone={activeZone} onZoneActivate={setActiveZone} />
          </Suspense>
        </Canvas>
      </div>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
        }
      `}</style>

      {/* ── Text overlay ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: '100%', zIndex: 10,
        pointerEvents: 'none',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '100px 48px 48px',
      }}>
        {/* Top-left headline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ maxWidth: 480, pointerEvents: 'auto' }}
        >
          <div style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 11, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: '#d4a437',
            fontWeight: 600, marginBottom: 14,
          }}>
            Independent Loss Adjusters & Marine Surveyors
          </div>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 800, color: '#ffffff',
            lineHeight: 1.15, margin: 0, marginBottom: 18,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            NETAS Surveys
          </h1>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 16, color: 'rgba(232,238,247,0.8)',
            lineHeight: 1.7, marginBottom: 28,
            textShadow: '0 1px 8px rgba(0,0,0,0.4)',
          }}>
            Baltic specialists since 1993. Click the survey<br />
            zones on the vessel to explore our services.
          </p>
          <a
            href="#contact"
            onClick={scrollToContact}
            style={{
              display: 'inline-block',
              padding: '13px 28px',
              background: 'linear-gradient(135deg, #f4c95d, #d4a437)',
              borderRadius: 6, color: '#0a1628',
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 700, fontSize: 13,
              letterSpacing: '0.08em', textDecoration: 'none',
              textTransform: 'uppercase',
              boxShadow: '0 8px 24px -4px rgba(244,201,93,0.45)',
              cursor: 'pointer',
            }}
          >
            Request a Survey
          </a>
        </motion.div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            display: 'flex', gap: 40,
            pointerEvents: 'auto',
          }}
        >
          {[
            { n: '1993', label: 'Est.' },
            { n: '8', label: 'Service types' },
            { n: '24/7', label: 'Response' },
            { n: 'LT · LV · EE', label: 'Baltic coverage' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800, fontSize: 20, color: '#f4c95d',
              }}>{n}</div>
              <div style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 11, color: 'rgba(143,164,196,0.8)',
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Zone info panel ── */}
      <AnimatePresence mode="wait">
        {activeZoneData && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'auto', height: '100%', position: 'relative' }}>
              <InfoPanel zone={activeZoneData} onClose={() => setActiveZone(null)} />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Hint tooltip ── */}
      <AnimatePresence>
        {!activeZone && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            style={{
              position: 'absolute', bottom: 52, left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 12, color: 'rgba(143,164,196,0.6)',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              zIndex: 15, pointerEvents: 'none',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <span style={{ width: 24, height: 1, background: 'rgba(143,164,196,0.3)', display: 'inline-block' }} />
            Click survey zones to explore
            <span style={{ width: 24, height: 1, background: 'rgba(143,164,196,0.3)', display: 'inline-block' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: 24, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}
      >
        <div style={{
          width: 24, height: 38, border: '1.5px solid rgba(143,164,196,0.3)',
          borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6,
        }}>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ width: 4, height: 4, borderRadius: '50%', background: '#d4a437' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
