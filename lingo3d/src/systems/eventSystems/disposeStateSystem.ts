import Appendable from "../../display/core/Appendable"
import { onDispose } from "../../events/onDispose"
import eventSimpleSystemWithData from "../utils/eventSimpleSystemWithData"

export const [addDisposeStateSystem, deleteDisposeStateSystem] =
    eventSimpleSystemWithData(
        (self: Appendable, data: { setState: (val: any) => void }, payload) =>
            self === payload && data.setState(undefined),
        onDispose
    )
