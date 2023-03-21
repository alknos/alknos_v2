import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import {  useFrame } from '@react-three/fiber'
import { Trail, Line, Sphere } from '@react-three/drei'

function Atom({r = 1, g = 1, b = 10, rBall = 70, gBall = 1, bBall = 10, ...props}) {
    const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])
    return (
      <group {...props}>
        <Line worldUnits points={points} color="white" lineWidth={0.3} />
        <Line worldUnits points={points} color="white" lineWidth={0.3} rotation={[0, 0, 1]} />
        <Line worldUnits points={points} color="white" lineWidth={0.3} rotation={[0, 0, -1]} />
        <Electron position={[0, 0, 0.5]} speed={6} r={r} g={g} b={b} rBall = {rBall} gBall = {gBall} bBall = {bBall}/>
        <Electron position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 3]} speed={6.5} r={r} g={g} b={b} rBall = {rBall} gBall = {gBall} bBall = {bBall}/>
        <Electron position={[0, 0, 0.5]} rotation={[0, 0, -Math.PI / 3]} speed={7} r={r} g={g} b={b} rBall = {rBall} gBall = {gBall} bBall = {bBall}/>
        <Sphere args={[0.55, 64, 64]}>
          <meshBasicMaterial color={[r, g, b]} toneMapped={false} />
        </Sphere>
      </group>
    )
  }
  
  function Electron({ radius = 2.75, speed = 6, r = 1, g = 1, b = 10, rBall = 70, gBall = 1, bBall = 10, ...props }) {
    const ref = useRef()
    useFrame((state) => {
      const t = state.clock.getElapsedTime() * speed
      ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 0)
    })
    return (
      <group {...props}>
        <Trail local width={5} length={6} color={new THREE.Color(r, g, b)} attenuation={(t) => t * t}>
          <mesh ref={ref}>
            <sphereGeometry args={[0.25]} />
            <meshBasicMaterial color={[rBall, gBall, bBall]} toneMapped={false} />
          </mesh>
        </Trail>
      </group>
    )
  }

export default Atom;