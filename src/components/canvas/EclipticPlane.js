import { EllipseCurve, BufferGeometry, Vector3 } from 'three';

const EclipticPlane = () => {

    const RING_COLOR = '#80a0c0';
    const RING_OPACITY = 0.25;
    const RING_COUNT = 25;

    const rings = Array.from({length: RING_COUNT}, (_, index) => index + 1);

    return(
        <group>
            <line geometry={new BufferGeometry().setFromPoints([new Vector3(-RING_COUNT, 0, 0), new Vector3(0, 0, 0), new Vector3(RING_COUNT, 0, 0)])}>
                <lineBasicMaterial color={RING_COLOR} transparent={true} opacity={RING_OPACITY} />
            </line>
            <line geometry={new BufferGeometry().setFromPoints([new Vector3(0, -RING_COUNT, 0), new Vector3(0, 0, 0), new Vector3(0, RING_COUNT, 0)])}>
                <lineBasicMaterial color={RING_COLOR} transparent={true} opacity={RING_OPACITY} />
            </line>
            {rings.map(ring => (
            <line key={ring} geometry={new BufferGeometry().setFromPoints(new EllipseCurve(0, 0, ring, ring).getPoints(64))}>
                <lineBasicMaterial color={RING_COLOR} transparent={true} opacity={RING_OPACITY} />
            </line>
            ))}
        </group>
    );
}

export default EclipticPlane;