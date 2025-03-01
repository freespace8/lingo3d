import { TetrahedronGeometry } from "three"
import Primitive from "../core/Primitive"
import { deg2Rad } from "@lincode/math"

const geometry = new TetrahedronGeometry(0.61)
geometry.rotateY(45 * deg2Rad)
geometry.rotateX(125 * deg2Rad)
geometry.translate(0, -0.2, 0.2)

export default class Tetrahedron extends Primitive {
    public static componentName = "tetrahedron"

    public constructor() {
        super(geometry)
    }
}
