import * as util from "./utils.js";

// class World defines the coordinate system for the model.
// It will be  upgraded with methods converting from other
// transforms like  GIS and DataSets.

// const defaultZ = (maxX, maxY) => Math.max(maxX, maxY)

/**
 * @private
 * @typedef {Object} WorldOptions
 * @property {number} minX Max world patch x integer value
 * @property {number} minY Max world patch y integer value
 * @property {number} minZ Max world patch z integer value
 * @property {number} maxX Min world patch x integer value
 * @property {number} maxY Min world patch y integer value
 * @property {number} maxZ Min world patch z integer value
 */

/**
 * @description
 * Class World defines the coordinate system for the model.
 * It has transforms for multiple coordinate systems.
 *
 * The world is defined by an object with 6 properties:
 *
 *          WorldOptions = {
 *              minX: integer,
 *              maxX: integer,
 *              minY: integer,
 *              maxY: integer,
 *              minZ: integer,
 *              maxZ: integer,
 *          }
 */
export default class World {
  maxX: number = 16;
  maxY: number = 16;
  maxZ: number = 16;
  minX: number = -16;
  minY: number = -16;
  minZ: number = -16;
  numX!: number;
  width!: number;
  numY!: number;
  height!: number;
  numZ!: number;
  depth!: number;
  minXcor!: number;
  maxXcor!: number;
  minYcor!: number;
  maxYcor!: number;
  minZcor!: number;
  maxZcor!: number;
  centerX!: number;
  centerY!: number;
  centerZ!: number;
  numPatches!: number;

  /**
   * Create a new World object given an Object with optional
   * minX, maxX, minY, maxY, minZ, maxZ overriding class properties.
   * @param {World|WorldOptions|Object} options Object with overrides for class properties
   */
  constructor(options = {}) {
    Object.assign(this, options); // set the option override values
    this.setWorld(); // convert these to rest of world parameters
  }

  /**
   * Return a default options object, origin at center.
   *
   * @param {number} [maxX=16] Integer max X value
   * @param {number} [maxY=maxX] Integer max Y value
   * @param {number} [maxZ=Math.max(maxX, maxY)] Integer max Z value
   * @returns {WorldOptions}
   */
  static defaultOptions(maxX = 16, maxY = maxX, maxZ = Math.max(maxX, maxY)) {
    return {
      minX: -maxX,
      maxX: maxX,
      minY: -maxY,
      maxY: maxY,
      minZ: -maxZ,
      maxZ: maxZ,
    };
  }
  /**
   * Factory to create a default World instance.
   *
   * @param {number} [maxX=16] Integer max X value
   * @param {number} [maxY=maxX] Integer max Y value
   * @param {number} [maxZ=Math.max(maxX, maxY)] Integer max Z value
   * @returns {World}
   */
  static defaultWorld(maxX = 16, maxY = maxX, maxZ = maxX) {
    return new World(World.defaultOptions(maxX, maxY, maxZ));
  }

  // ======================

  setWorld() {
    // Complete properties derived from minX/Y, maxX/Y (patchSize === 1)

    let { minX, maxX, minY, maxY, minZ, maxZ } = this;

    util.forLoop(
      { minX, maxX, minY, maxY, minZ, maxZ },
      (val: unknown, key: any) => {
        if (!Number.isInteger(val))
          throw Error(`${key}:${val} must be an integer`);
      }
    );

    this.numX = this.width = maxX - minX + 1;
    this.numY = this.height = maxY - minY + 1;
    // if (maxZ == null) maxZ = this.maxZ = Math.max(this.width, this.height)
    this.numZ = this.depth = maxZ - minZ + 1;

    this.minXcor = minX - 0.5;
    this.maxXcor = maxX + 0.5;
    this.minYcor = minY - 0.5;
    this.maxYcor = maxY + 0.5;
    this.minZcor = minZ - 0.5;
    this.maxZcor = maxZ + 0.5;

    // The midpoints of the world, in world coords.
    this.centerX = (minX + maxX) / 2;
    this.centerY = (minY + maxY) / 2;
    this.centerZ = (minZ + maxZ) / 2;

    this.numPatches = this.numX * this.numY;
  }

  /**
   * Return the options (minX, maxX, ..) used to create this world.
   *
   * @returns {Object} A WorldOptions object
   */
  getOptions() {
    const { minX, minY, minZ, maxX, maxY, maxZ } = this;
    return { minX, minY, minZ, maxX, maxY, maxZ };
  }

  /**
   * Return a random 2D point within the World
   *
   * @returns {Array} A random x,y float array
   */
  randomPoint(): [x: number, y: number] {
    return [
      util.randomFloat2(this.minXcor, this.maxXcor),
      util.randomFloat2(this.minYcor, this.maxYcor),
    ];
  }

  /**
   * Return a random 3D point within the World
   *
   * @returns {Array} A random x,y,z float array
   */
  random3DPoint(): [x: number, y: number, z: number] {
    return [
      util.randomFloat2(this.minXcor, this.maxXcor),
      util.randomFloat2(this.minYcor, this.maxYcor),
      util.randomFloat2(this.minZcor, this.maxZcor),
    ];
  }

  /**
   * Return a random Patch 2D integer point
   *
   * @returns {Array}  A random x,y integer array
   */
  randomPatchPoint(): [x: number, y: number] {
    return [
      util.randomInt2(this.minX, this.maxX),
      util.randomInt2(this.minY, this.maxY),
    ];
  }

  /**
   * Given x,y,z values return true if within the world
   *
   * @param {number} x x value
   * @param {number} y y value
   * @param {number} [z=this.centerZ] z value
   * @returns {boolean} Whether or not on-world
   */
  isOnWorld(x: number, y: number, z: number = this.centerZ) {
    return (
      this.minXcor <= x &&
      x <= this.maxXcor &&
      //
      this.minYcor <= y &&
      y <= this.maxYcor &&
      //
      this.minZcor <= z &&
      z <= this.maxZcor
    );
  }
  // cropToWorld(x, y) {}

  // Note minX etc NOT the world's but of the coord sys we want to use.
  /**
   * Return an instance of a bounding box 2D transform.
   * It linearly interpolates between the given minX, minY, maxX, maxY,
   * and the world's values of the same properties.
   *
   * The parameters are in the popular geojson order: west, south, east, north
   *
   * Useful for Canvas top-left transforms and geojson transforms.
   *
   * @param {number} minX min bounding box x value
   * @param {number} minY min bounding box y value
   * @param {number} maxX max bounding box x value
   * @param {number} maxY max bounding box y value
   * @returns {BBoxTransform} Instance of the BBoxTransform
   */
  bboxTransform(minX: number, minY: number, maxX: number, maxY: number) {
    return new BBoxTransform(minX, minY, maxX, maxY, this);
  }

  // ### Following use PatchSize

  // Get the world size in pixels. PatchSize is optional, defalting to 1
  getWorldSize(patchSize = 1) {
    return [this.numX * patchSize, this.numY * patchSize];
  }

  // Convert a canvas context to world euclidean coordinates
  // Change the ctx.canvas size, determined by patchSize.
  setEuclideanTransform(
    ctx: {
      canvas: any;
      restore: () => void;
      save: () => void;
      scale: (arg0: any, arg1: number) => void;
      translate: (arg0: number, arg1: number) => void;
    },
    patchSize: number
  ) {
    // ctx.canvas.width = this.numX * patchSize
    // ctx.canvas.height = this.numY * patchSize
    this.setCanvasSize(ctx.canvas, patchSize);
    ctx.restore(); // close earlier save(). OK if no save called yet.
    ctx.save();
    ctx.scale(patchSize, -patchSize);
    ctx.translate(-this.minXcor, -this.maxYcor);
  }
  // Return patch size for given canvas.
  // Error if canvas patch width/height differ.
  patchSize(canvas: { clientWidth: any; clientHeight: any }) {
    const { numX, numY } = this;
    const { clientWidth: width, clientHeight: height } = canvas;
    const xSize = width / numX;
    const ySize = height / numY;
    if (xSize !== ySize) {
      throw Error(`World patchSize: x/y sizes differ ${xSize}, ${ySize}`);
    }
    return xSize;
  }
  // Change canvas size to this world's size.
  // Does not change size if already the same, preserving the ctx content.
  setCanvasSize(canvas: any, patchSize: number) {
    const [width, height] = this.getWorldSize(patchSize);
    util.setCanvasSize(canvas, width, height);
  }

  // Convert pixel location (top/left offset i.e. mouse) to patch coords (float)
  pixelXYtoPatchXY(x: number, y: number, patchSize: number) {
    return [this.minXcor + x / patchSize, this.maxYcor - y / patchSize];
  }
  // Convert patch coords (float) to pixel location (top/left offset i.e. mouse)
  patchXYtoPixelXY(x: number, y: number, patchSize: number) {
    return [(x - this.minXcor) * patchSize, (this.maxYcor - y) * patchSize];
  }

  xyToPatchIndex(x: number, y: number) {
    if (!this.isOnWorld(x, y)) return undefined;
    const { minX, maxX, maxY, numX, maxXcor, maxYcor } = this;
    x = x === maxXcor ? maxX : Math.round(x);
    y = y === maxYcor ? maxY : Math.round(y);
    return x - minX + numX * (maxY - y);
  }
  // patchIndexToXY(index) {}
}

/**
 * A linear transformer between world coords and the given bounding box.
 *
 * @class
 * @private
 */
class BBoxTransform {
  bbox: any[];
  mx: number;
  my: number;
  bx: number;
  by: number;
  /**
   * Creates an instance of BBoxTransform.
   * See https://tools.ietf.org/html/rfc7946#section-5
   * .. which defines bbox as [west, south, east, north]
   * .. which is the bbox [minX, minY, maxX, maxY]
   * @param {number} minX min bounding box x value
   * @param {number} minY max bounding box x value
   * @param {number} maxX min bounding box y value
   * @param {number} maxY max bounding box y value
   * @param {World} world instance of a World object
   */
  constructor(
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
    world: World
  ) {
    this.bbox = [minX, minY, maxX, maxY];

    if (minX < maxX) console.log("flipX");
    if (maxY < minY) console.log("flipY");

    if (minX < maxX) [minX, maxX] = [maxX, minX];
    if (maxY < minY) [maxY, minY] = [minY, maxY];
    const { maxXcor, maxYcor, minXcor, minYcor } = world;

    this.mx = (minX - maxX) / (maxXcor - minXcor);
    this.my = (maxY - minY) / (maxYcor - minYcor);

    this.bx = (minX + maxX - this.mx * (maxXcor + minXcor)) / 2;
    this.by = (maxY + minY - this.my * (maxYcor + minYcor)) / 2;
  }

  /**
   * Convert from bbox point to world point
   *
   * @param {Array} bboxPoint A point in the bbox coordinates
   * @returns {Array} A point in the world coordinates
   */
  toWorld(bboxPoint: number[]) {
    const { mx, my, bx, by } = this;
    const [bboxX, bboxY] = bboxPoint;
    const x = (bboxX - bx) / mx;
    const y = (bboxY - by) / my;
    return [x, y];
  }

  /**
   * Convert from world point to bbox point
   *
   * @param {Array} worldPoint A point in the world coordinates
   * @returns {Array} A point in the bbox coordinates
   */
  toBBox(worldPoint: [any, any]) {
    const { mx, my, bx, by } = this;
    const [worldX, worldY] = worldPoint;
    const x = mx * worldX + bx;
    const y = my * worldY + by;
    return [x, y];
  }

  // aspectRatio() {
  //     const [west, south, east, north] = this.bbox
  //     return Math.abs((east - west) / (north - south))
  // }

  // Return center [x,y] of bbox in bbox coords.
  bboxCenter() {
    const [west, south, east, north] = this.bbox;
    return [(west + east) / 2, (south + north) / 2];
  }
  // Return 4 coordinate points of bbox corners, from topLeft, clockwise.
  bboxCoords() {
    const [west, south, east, north] = this.bbox;
    return [
      [west, north],
      [east, north],
      [east, south],
      [west, south],
    ];
  }
}
