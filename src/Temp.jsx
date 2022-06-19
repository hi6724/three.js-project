import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { PerspectiveCamera, Icosahedron, OrbitControls } from "@react-three/drei";

import { Canvas, useThree } from "@react-three/fiber";

function Temp(props) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [controls, setControls] = useState(null);
  const [threeState, setThreeState] = useState(null);
  const [treeStateInitialized, setThreeStateInitialized] = useState(false);

  useEffect(() => {
    if (threeState) {
      _.forOwn(props.objects, (value, key) => {
        threeState.scene.current.add(value);
      });
    }

    return () => {
      if (controls) controls.dispose();
    };
  }, []);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const { objects } = props;
  const prevState = usePrevious({ objects });
  const mainCamera = useRef();

  useEffect(() => {
    if (!threeState) return;
    if (!treeStateInitialized || shouldUpdateObjects(props.objects, prevState.objects)) {
      setThreeStateInitialized(true);
      garbageCollectOldObjects();
      addDefaultObjects();
      _.forOwn(props.objects, (value, key) => {
        threeState.scene.add(value);
      });
    }
  });

  const addDefaultObjects = () => {
    if (threeState) {
      var hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2);
      hemiLight.position.set(0, 0, 1);
      threeState.scene.add(hemiLight);
    }
  };

  const garbageCollectOldObjects = () => {
    while (threeState && threeState.scene.children.length) {
      const oldObject = threeState.scene.children[0];
      oldObject.traverse((child) => {
        if (child.geometry) {
          child.geometry?.dispose();
          if (child.material && Array.isArray(child.material)) {
            child.material.forEach((d) => d.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
      threeState.scene.remove(oldObject);
    }
  };

  const shouldUpdateObjects = (currentObjects, nextObjects) => {
    const result = false;
    let currentDigest = 1;
    let nextDigest = 1;
    _.forIn(currentObjects, (value, key) => {
      currentDigest *= value.id;
    });
    _.forIn(nextObjects, (value, key) => {
      nextDigest *= value.id;
    });
    return currentDigest !== nextDigest;
  };

  const hasAncestorWhichDisablesThreeJs = (element) => {
    if (!element) return false;
    let isEditable = false;
    for (let i = 0; i < element.classList.length; i++) {
      if (element.classList[i] === "disable-threejs-controls") {
        isEditable = true;
      }
    }
    return isEditable || hasAncestorWhichDisablesThreeJs(element.parentElement);
  };

  const initializeScene = (state) => {
    setThreeState(state);
    addDefaultObjects();
  };

  return (
    <div
      id="threejs-controllers-div"
      className="threejs-container"
      onMouseOver={(e) => {
        const target = e.target;
        if (!target || !controls) return true;
        if (hasAncestorWhichDisablesThreeJs(target)) {
          controls.enabled = false;
        } else {
          controls.enabled = true;
        }
      }}
    >
      <Canvas
        className="threejs"
        onCreated={(state) => {
          initializeScene(state);
        }}
        shadows={true}
        gl={{
          "shadowMap.enabled": true,
          alpha: true,
        }}
      >
        <PerspectiveCamera
          makeDefault
          ref={mainCamera}
          position-x={props.cameraX || 0}
          position-y={props.cameraY || -20}
          position-z={props.cameraZ || 20}
          up={[0, 0, 1]}
          fov={15}
          aspect={width / height}
          near={1}
          far={10000}
          visible={false}
          controls={controls}
        />
        <OrbitControls
          ref={controls}
          camera={mainCamera.current}
          domElement={document.getElementById("threejs-controllers-div")}
          enabled={true}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          target-x={props.targetX || 0}
          target-y={props.targetY || 0}
          target-z={props.targetZ || 0}
        />
      </Canvas>
      <div className="threejs-react-container">{props.children}</div>
    </div>
  );
}

VisualizationComponent.propTypes = {
  children: PropTypes.node.isRequired,
  objects: PropTypes.object.isRequired,

  cameraX: PropTypes.number,
  cameraY: PropTypes.number,
  cameraZ: PropTypes.number,
  targetX: PropTypes.number,
  targetY: PropTypes.number,
  targetZ: PropTypes.number,
};

export default withRouter(VisualizationComponent);
