import { disableSchema } from "../collections/disableSchema"
import setupStruct from "../api/settings/setupStruct"
import { environmentChoices } from "./IEnvironment"
import Choices from "./utils/Choices"
import { extendDefaults } from "./utils/Defaults"
import { ExtractProps } from "./utils/extractProps"
import Range from "./utils/Range"

type Type = typeof setupStruct

export default interface ISetup extends Type {
    uuid: string
}

export const setupSchema: Required<ExtractProps<ISetup>> = {
    uuid: String,
    defaultLight: Boolean,
    lightDistance: Number,
    pointLightPool: Number,
    spotLightPool: Number,
    shadowMode: [Boolean, String],
    environment: String,
    skybox: [String, Array],
    grid: Boolean,
    stats: Boolean,
    antiAlias: [Boolean, String],
    pixelRatio: Number,
    fps: Number,
    gravity: Number,
    exposure: Number,
    bloom: Boolean,
    bloomIntensity: Number,
    bloomThreshold: Number,
    bloomRadius: Number,
    ssr: Boolean,
    ssrIntensity: Number,
    ssrJitter: Number,
    ssao: Boolean,
    ssaoIntensity: Number,
    outlineColor: String,
    outlineHiddenColor: String,
    outlinePattern: String,
    outlinePulse: Number,
    outlineStrength: Number,
    bokeh: Boolean,
    bokehScale: Number,
    vignette: Boolean,
    texture: String,
    color: String
}
for (const key of ["antiAlias", "pixelRatio", "ssaoIntensity"])
    disableSchema.add(key)

export const setupDefaults = extendDefaults<ISetup>(
    [],
    { ...setupStruct, uuid: "" },
    {
        lightDistance: new Range(500, 5000),
        pointLightPool: new Range(1, 10, 1),
        spotLightPool: new Range(1, 10, 1),
        shadowMode: new Choices({
            true: true,
            false: false,
            physics: "physics"
        }),
        environment: environmentChoices,
        pixelRatio: new Range(1, 2, 1),
        fps: new Range(30, 60, 30),
        gravity: new Range(-20, 0),
        exposure: new Range(0, 2),
        bokehScale: new Range(0, 20),
        bloomIntensity: new Range(0, 10),
        bloomThreshold: new Range(0, 1),
        bloomRadius: new Range(0, 1),
        ssrIntensity: new Range(0, 2),
        ssrJitter: new Range(0, 1),
        ssaoIntensity: new Range(0, 4),
        outlinePulse: new Range(0, 2),
        outlineStrength: new Range(0, 4),
        antiAlias: new Choices({ MSAA: "MSAA", SMAA: "SMAA", false: false })
    }
)
