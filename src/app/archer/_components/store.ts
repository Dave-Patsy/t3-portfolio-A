
import { createRef } from "react";
import { create } from "zustand";
import shallow from "zustand/shallow";

import type { RefObject } from "react";
import type { Api, WheelInfoOptions, PublicApi } from "@react-three/cannon";
import type { Group, Object3D } from "three";

// import type { GetState, SetState, StateSelector } from "zustand";

export const angularVelocity = [0, 0.5, 0] as const;
export const cameras = ["DEFAULT", "FIRST_PERSON", "BIRD_EYE"] as const;

const controls = {
  backwards: false,
  boost: false,
  brake: false,
  forward: false,
  honk: false,
  left: false,
  right: false,
};

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
export const debug = false as const;
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
export const dpr = 1.5 as const;
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
export const levelLayer = 1 as const;
export const maxBoost = 100 as const;
export const position = [-110, 0.75, 220] as const;
export const rotation = [0, Math.PI / 2 + 0.35, 0] as const;
export const shadows = true as const;
export const stats = false as const;

export const vehicleConfig = {
  width: 1.7,
  height: -0.3,
  front: 1.35,
  back: -1.3,
  steer: 0.3,
  force: 1800,
  maxBrake: 65,
  maxSpeed: 88,
} as const;

const actionNames = ["onCheckpoint", "onFinish", "onStart", "reset"] as const;
export type ActionNames = (typeof actionNames)[number];

const useStore = create((set) => ({}));
