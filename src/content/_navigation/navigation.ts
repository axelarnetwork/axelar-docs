import { developer } from "./developers";
import { learnmore } from "./learnmore";
import { node } from "./node-operators";
import { resources } from "./resources";
import { validators } from "./validators";

export const sortedNavigation = [
  developer,
  node,
  validators,
  resources,
  learnmore,
];

export const mainNav = ["dev", "validator", "node"];
export const hideNav = ["controller"];
export const hideLinksFromSidebar = [
  "/learn/intro/",
  "/node/join-old/",
  "/validator/external-chains/aurora/",
  "/validator/external-chains/hero/",
  "/validator/external-chains/polygon-zkevm/",
  "/dev/amplifier/relay-messages/",
];
