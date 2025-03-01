import { pull } from "@lincode/utils"
import { Signal } from "@preact/signals"
import { useEffect } from "preact/hooks"

export type TabProps = {
    children?: string
    selected?: boolean
    selectedSignal: Signal<Array<string>>
    disabled?: boolean
    half?: boolean
    id?: string
}

export const selectTab = (
    selectedSignal: Signal<Array<string>>,
    id: string
) => {
    pull(selectedSignal.value, id)
    selectedSignal.value = [...selectedSignal.value, id]
}

const Tab = ({
    children,
    selected,
    selectedSignal,
    disabled,
    half,
    id = children
}: TabProps) => {
    useEffect(() => {
        if ((selected || !selectedSignal.value[0]) && id)
            selectTab(selectedSignal, id)
    }, [selected, id])

    return (
        <div
            className="lingo3d-bg lingo3d-flexcenter"
            style={{
                width: half ? "50%" : undefined,
                opacity: disabled ? 0.1 : 1,
                height: 20,
                padding: half ? undefined : 12,
                background:
                    selectedSignal.value.at(-1) === id
                        ? "rgba(255, 255, 255, 0.1)"
                        : undefined
            }}
            onClick={
                disabled || !id
                    ? undefined
                    : () => selectTab(selectedSignal, id)
            }
        >
            {children}
        </div>
    )
}

export default Tab
