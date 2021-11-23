import Model from "./js/Model3D.js";

/**
 *  This is our default Model which simply re-exports Model3D
 *  Thus when using:
 *
 *  import Model from './Model.js'
 *
 *  ..you will be using ./Model3D
 *
 *  @param {Object|World} [worldOptions=World.defaultOptions()]
 *  Identical to {@link Model2D}
 */

export default Model;
