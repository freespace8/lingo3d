import "./engine/polyfill"

export const PI = Math.PI
export const PI2 = PI * 2
export const PI_HALF = PI * 0.5

export const CM2M = 1 / 100
export const M2CM = 100

export const WIDTH = 375
export const HEIGHT = 667

export const STANDARD_FRAME = 60
export const INVERSE_STANDARD_FRAME = 1 / STANDARD_FRAME

export const CLICK_TIME = 300

export const MIN_POLAR_ANGLE = 5
export const MAX_POLAR_ANGLE = 175
export const ORTHOGRAPHIC_FRUSTUM = 5.7
export const NEAR = 0.1
export const FAR = 1000
export const SHADOW_BIAS = -0.0055

export const DEBUG = false
export const VERSION = "2.0.38"

export const FRAME_WIDTH = 12
export const FRAME_HEIGHT = FRAME_WIDTH * 2
export const FRAME_MAX = Number.MAX_SAFE_INTEGER / FRAME_WIDTH
export const APPBAR_HEIGHT = 28
export const PANELS_HEIGHT = 200
export const LIBRARY_WIDTH = 200
export const EDITOR_WIDTH = 300
export const TREE_ITEM_HEIGHT = 18
