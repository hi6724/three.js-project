export default function Box() {
  return (
    <mesh>
      <boxGeometry args={[2, 3]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}
