import { BufferGeometry, Mesh, MeshStandardMaterial } from "three"
import ITexturedStandard, {
    Blending,
    ColorString,
    texturedStandardDefaults,
    texturedStandardSchema
} from "../../../interface/ITexturedStandard"
import getDefaultValue from "../../../interface/utils/getDefaultValue"
import { color } from "../../utils/reusables"
import MeshAppendable from "../MeshAppendable"
import { MaterialParams } from "../../../pools/materialPool"
import { addRefreshTexturedStandardSystem } from "../../../systems/configSystems/refreshTexturedStandardSystem"
import { toFixedPoint, toNullableFixed } from "../../../api/serializer/toFixed"
import { PointType, isPoint } from "../../../utils/isPoint"
import { addConfigCastShadowSystem } from "../../../systems/configLoadedSystems/configCastShadowSystem"

const standardDefaults = Object.fromEntries(
    Object.entries(texturedStandardSchema).map(([key]) => [
        key,
        structuredClone(getDefaultValue(texturedStandardDefaults, key, true))
    ])
)

export type StandardMesh = Mesh<BufferGeometry, MeshStandardMaterial>

export default abstract class TexturedStandardMixin
    extends MeshAppendable<StandardMesh>
    implements ITexturedStandard
{
    public get $material() {
        return this.object3d.material
    }
    public set $material(val: MeshStandardMaterial) {
        this.object3d.material = val
    }

    private _defaults?: Record<string, any>
    public get $defaults() {
        return (this._defaults ??= standardDefaults)
    }

    private _materialParams?: MaterialParams
    public get $materialParams() {
        return (this._materialParams ??= Object.values(
            this.$defaults
        ) as MaterialParams)
    }

    public get color() {
        return this.$materialParams[0]
    }
    public set color(val: ColorString | undefined) {
        this.$materialParams[0] = val
            ? "#" + color.set(val).getHexString()
            : this.$defaults.color
        addRefreshTexturedStandardSystem(this)
    }

    public get opacity() {
        return this.$materialParams[1]
    }
    public set opacity(val: number | undefined) {
        this.$materialParams[1] = toNullableFixed(val) ?? this.$defaults.opacity
        addRefreshTexturedStandardSystem(this)
        addConfigCastShadowSystem(this as any)
    }

    public get texture() {
        return this.$materialParams[2]
    }
    public set texture(val: string | undefined) {
        this.$materialParams[2] = val ?? this.$defaults.texture
        addRefreshTexturedStandardSystem(this)
    }

    public get alphaMap() {
        return this.$materialParams[3]
    }
    public set alphaMap(val: string | undefined) {
        this.$materialParams[3] = val ?? this.$defaults.alphaMap
        addRefreshTexturedStandardSystem(this)
    }

    public get textureRepeat() {
        return this.$materialParams[4]
    }
    public set textureRepeat(val: number | PointType | undefined) {
        this.$materialParams[4] =
            (isPoint(val) ? toFixedPoint(val) : toNullableFixed(val)) ??
            this.$defaults.textureRepeat
        addRefreshTexturedStandardSystem(this)
    }

    public get textureFlipY() {
        return this.$materialParams[5]
    }
    public set textureFlipY(val: boolean | undefined) {
        this.$materialParams[5] = val ?? this.$defaults.textureFlipY
        addRefreshTexturedStandardSystem(this)
    }

    public get textureRotation() {
        return this.$materialParams[6]
    }
    public set textureRotation(val: number | undefined) {
        this.$materialParams[6] =
            toNullableFixed(val) ?? this.$defaults.textureRotation
        addRefreshTexturedStandardSystem(this)
    }

    public get wireframe() {
        return this.$materialParams[7]
    }
    public set wireframe(val: boolean | undefined) {
        this.$materialParams[7] = val ?? this.$defaults.wireframe
        addRefreshTexturedStandardSystem(this)
    }

    public get envMap() {
        return this.$materialParams[8]
    }
    public set envMap(val: string | undefined) {
        this.$materialParams[8] = val ?? this.$defaults.envMap
        addRefreshTexturedStandardSystem(this)
    }

    public get envMapIntensity() {
        return this.$materialParams[9]
    }
    public set envMapIntensity(val: number | undefined) {
        this.$materialParams[9] =
            toNullableFixed(val) ?? this.$defaults.envMapIntensity
        addRefreshTexturedStandardSystem(this)
    }

    public get aoMap() {
        return this.$materialParams[10]
    }
    public set aoMap(val: string | undefined) {
        this.$materialParams[10] = val ?? this.$defaults.aoMap
        addRefreshTexturedStandardSystem(this)
    }

    public get aoMapIntensity() {
        return this.$materialParams[11]
    }
    public set aoMapIntensity(val: number | undefined) {
        this.$materialParams[11] =
            toNullableFixed(val) ?? this.$defaults.aoMapIntensity
        addRefreshTexturedStandardSystem(this)
    }

    public get bumpMap() {
        return this.$materialParams[12]
    }
    public set bumpMap(val: string | undefined) {
        this.$materialParams[12] = val ?? this.$defaults.bumpMap
        addRefreshTexturedStandardSystem(this)
    }

    public get bumpScale() {
        return this.$materialParams[13]
    }
    public set bumpScale(val: number | undefined) {
        this.$materialParams[13] =
            toNullableFixed(val) ?? this.$defaults.bumpScale
        addRefreshTexturedStandardSystem(this)
    }

    public get displacementMap() {
        return this.$materialParams[14]
    }
    public set displacementMap(val: string | undefined) {
        this.$materialParams[14] = val ?? this.$defaults.displacementMap
        addRefreshTexturedStandardSystem(this)
    }

    public get displacementScale() {
        return this.$materialParams[15]
    }
    public set displacementScale(val: number | undefined) {
        this.$materialParams[15] =
            toNullableFixed(val) ?? this.$defaults.displacementScale
        addRefreshTexturedStandardSystem(this)
    }

    public get displacementBias() {
        return this.$materialParams[16]
    }
    public set displacementBias(val: number | undefined) {
        this.$materialParams[16] =
            toNullableFixed(val) ?? this.$defaults.displacementBias
        addRefreshTexturedStandardSystem(this)
    }

    public get emissive() {
        return this.$materialParams[17]
    }
    public set emissive(val: boolean | undefined) {
        this.$materialParams[17] = val ?? this.$defaults.emissive
        addRefreshTexturedStandardSystem(this)
    }

    public get emissiveIntensity() {
        return this.$materialParams[18]
    }
    public set emissiveIntensity(val: number | undefined) {
        this.$materialParams[18] =
            toNullableFixed(val) ?? this.$defaults.emissiveIntensity
        addRefreshTexturedStandardSystem(this)
    }

    public get lightMap() {
        return this.$materialParams[19]
    }
    public set lightMap(val: string | undefined) {
        this.$materialParams[19] = val ?? this.$defaults.lightMap
        addRefreshTexturedStandardSystem(this)
    }

    public get lightMapIntensity() {
        return this.$materialParams[20]
    }
    public set lightMapIntensity(val: number | undefined) {
        this.$materialParams[20] =
            toNullableFixed(val) ?? this.$defaults.lightMapIntensity
        addRefreshTexturedStandardSystem(this)
    }

    public get metalnessMap() {
        return this.$materialParams[21]
    }
    public set metalnessMap(val: string | undefined) {
        this.$materialParams[21] = val ?? this.$defaults.metalnessMap
        addRefreshTexturedStandardSystem(this)
    }

    public get metalness() {
        return this.$materialParams[22]
    }
    public set metalness(val: number | undefined) {
        this.$materialParams[22] =
            toNullableFixed(val) ?? this.$defaults.metalness
        addRefreshTexturedStandardSystem(this)
    }

    public get roughnessMap() {
        return this.$materialParams[23]
    }
    public set roughnessMap(val: string | undefined) {
        this.$materialParams[23] = val ?? this.$defaults.roughnessMap
        addRefreshTexturedStandardSystem(this)
    }

    public get roughness() {
        return this.$materialParams[24]
    }
    public set roughness(val: number | undefined) {
        this.$materialParams[24] =
            toNullableFixed(val) ?? this.$defaults.roughness
        addRefreshTexturedStandardSystem(this)
    }

    public get normalMap() {
        return this.$materialParams[25]
    }
    public set normalMap(val: string | undefined) {
        this.$materialParams[25] = val ?? this.$defaults.normalMap
        addRefreshTexturedStandardSystem(this)
    }

    public get normalScale() {
        return this.$materialParams[26]
    }
    public set normalScale(val: number | undefined) {
        this.$materialParams[26] =
            toNullableFixed(val) ?? this.$defaults.normalScale
        addRefreshTexturedStandardSystem(this)
    }

    public get depthTest() {
        return this.$materialParams[27]
    }
    public set depthTest(val: boolean | undefined) {
        this.$materialParams[27] = val ?? this.$defaults.depthTest
        addRefreshTexturedStandardSystem(this)
    }

    public get blending() {
        return this.$materialParams[28]
    }
    public set blending(val: Blending | undefined) {
        this.$materialParams[28] = val ?? this.$defaults.blending
        addRefreshTexturedStandardSystem(this)
    }
}
