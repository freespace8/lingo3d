import Appendable from "./core/Appendable"
import { addConfigLineSystem } from "../systems/configSystems/configLineSystem"
import { Point3dType } from "../utils/isPoint"

export default class Line extends Appendable {
    private _bloom?: boolean
    public get bloom() {
        return this._bloom
    }
    public set bloom(value) {
        this._bloom = value
        addConfigLineSystem(this)
    }

    private _from?: Point3dType
    public get from() {
        return this._from
    }
    public set from(value) {
        this._from = value
        addConfigLineSystem(this)
    }

    private _to?: Point3dType
    public get to() {
        return this._to
    }
    public set to(value) {
        this._to = value
        addConfigLineSystem(this)
    }

    private _thickness = 1
    public get thickness() {
        return this._thickness
    }
    public set thickness(value) {
        this._thickness = value
        addConfigLineSystem(this)
    }
}
