import AppBar from "../component/bars/AppBar"
import IconButton from "../component/IconButton"
import useSyncState from "../hooks/useSyncState"
import { getTimeline } from "../../states/useTimeline"
import { getTimelinePaused } from "../../states/useTimelinePaused"
import FirstFrameIcon from "./icons/FirstFrameIcon"
import LastFrameIcon from "./icons/LastFrameIcon"
import NextFrameIcon from "./icons/NextFrameIcon"
import PauseIcon from "../component/icons/PauseIcon"
import PlayIcon from "../component/icons/PlayIcon"
import PrevFrameIcon from "./icons/PrevFrameIcon"
import {
    getTimelineRecord,
    setTimelineRecord
} from "../../states/useTimelineRecord"
import AudioIcon from "./icons/AudioIcon"
import { getTimelineMute, setTimelineMute } from "../../states/useTimelineMute"
import MuteIcon from "./icons/MuteIcon"
import { emitTimelineHighlightFrame } from "../../events/onTimelineHighlightFrame"
import { emitTimelineFrame } from "../../events/onTimelineFrame"
import { timelineFramePtr } from "../../pointers/timelineFramePtr"
import { timelinePtr } from "../../pointers/timelinePtr"

const TimelineControls = () => {
    const timeline = useSyncState(getTimeline)
    const paused = useSyncState(getTimelinePaused)
    const record = useSyncState(getTimelineRecord)
    const mute = useSyncState(getTimelineMute)

    return (
        <AppBar noPadding style={{ gap: 4 }}>
            {paused ? (
                <IconButton
                    disabled={!timeline}
                    onClick={
                        timeline
                            ? () => {
                                  if (timeline.frame >= timeline.lastFrame)
                                      timeline.frame = 0
                                  emitTimelineHighlightFrame(undefined)
                                  timeline.paused = false
                              }
                            : undefined
                    }
                >
                    <PlayIcon />
                </IconButton>
            ) : (
                <IconButton
                    disabled={!timeline}
                    onClick={
                        timeline
                            ? () => {
                                  emitTimelineHighlightFrame(undefined)
                                  timeline.paused = true
                              }
                            : undefined
                    }
                >
                    <PauseIcon />
                </IconButton>
            )}

            <IconButton
                disabled={!timeline}
                onClick={() =>
                    emitTimelineFrame(Math.max(timelineFramePtr[0] - 1, 0))
                }
            >
                <PrevFrameIcon />
            </IconButton>
            <IconButton
                disabled={!timeline}
                onClick={() => emitTimelineFrame(timelineFramePtr[0] + 1)}
            >
                <NextFrameIcon />
            </IconButton>

            <IconButton
                disabled={!timeline}
                onClick={() => emitTimelineFrame(0)}
            >
                <FirstFrameIcon />
            </IconButton>
            <IconButton
                disabled={!timeline}
                onClick={() => emitTimelineFrame(timelinePtr[0]!.lastFrame)}
            >
                <LastFrameIcon />
            </IconButton>
            <IconButton
                disabled={!timeline}
                onClick={
                    timeline
                        ? () => {
                              setTimelineRecord(!record)
                              emitTimelineHighlightFrame(undefined)
                              timeline.paused = true
                          }
                        : undefined
                }
            >
                <div
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        background: record ? "red" : "white"
                    }}
                />
            </IconButton>
            <IconButton
                disabled={!timeline}
                onClick={() => setTimelineMute(!mute)}
            >
                {mute ? <MuteIcon /> : <AudioIcon />}
            </IconButton>
        </AppBar>
    )
}

export default TimelineControls
