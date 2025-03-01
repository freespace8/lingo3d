import Appendable from "../../display/core/Appendable"
import { emitSceneGraphChange } from "../../events/onSceneGraphChange"
import configSimpleSystem from "../utils/configSimpleSystem"

export const [addEmitSceneGraphChangeSystem, deleteEmitSceneGraphChangeSystem] =
    configSimpleSystem(
        (self: Appendable) => !self.$disableSceneGraph && emitSceneGraphChange()
    )
