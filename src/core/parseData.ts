import { filter, isArray, isEmpty } from 'lodash'
import {
  MeasureXML,
  Measure,
  Clef,
  Note,
  NoteType,
  SlurType
} from '../types'
import {
  isTabNote,
  isRest,
  isChord,
  hasTie,
  hasSlur
} from './validate'
import getBpm from './measure/getBpm'
import getBeats from './measure/getBeats'
import getBeatType from './measure/getBeatType'
import getCapo from './measure/getCapo'
import calNoteDuration from './note/calNoteDuration'
import calNoteWidth from './note/calNoteWidth'
import setMeasureTimeProps from './measure/setMeasureTimeProps'
import setMeasureSizeProps from './measure/setMeasureSizeProps'
import setNoteTimeProps from './note/setNoteTimeProps'
import setNoteSlurProps from './note/setNoteSlurProps'
import setNoteTieProps from './note/setNoteTieProps'
import setNoteCoordProps from './note/setNoteCoordProps'
import setNoteSizeProps from './note/setNoteSizeProps'
import setSingleNoteProps from './note/setSingleNoteProps'
import setChordNoteProps from './note/setChordNoteProps'
import setRestNoteProps from './note/setRestNoteProps'

interface ReturnData {
  measureList: Measure[]
  noteList: Note[]
  totalWidth: number
  totalDuration: number
}

/**
 * 解析数据
 */
export default function parseData(
  measureXML: MeasureXML[] = [],
  clef: Clef = {},
  speed: number,
  bpmUnit: NoteType,
  minWidth: number
): ReturnData {
  const mList: Measure[] = []
  const nList: Note[] = []

  let globalBpm: number = 60
  let globalBeats: number
  let globalBeatType: number
  let globalCapo: number = 0

  let noteCount: number = 1 // 音符数量累计

  let totalWidth: number = 0 // 总宽度
  let totalDuration: number = 0 // 总时长

  measureXML.map((measure: MeasureXML) => {
    if (isEmpty(measure)) {
      return
    }

    const { _number, note, partId } = measure

    let bpm: number = getBpm(measure) || globalBpm
    bpm = Math.round(bpm * speed)

    const beats: number = getBeats(measure) || globalBeats
    const beatType: number = getBeatType(measure) || globalBeatType
    const capo: number = getCapo(measure) || globalCapo

    // 设置全局
    globalBpm = bpm
    globalBeats = beats
    globalBeatType = beatType
    globalCapo = capo

    let mWidth: number = 0 // 小节宽度
    let mDuration: number = 0 // 小节时长

    const mId: string = `M_${_number}` // 生成小节ID

    // 如果小节没有<note>，则自动添加一个全休止符
    if (isEmpty(note)) {
      const node: Note = { id: `N_${noteCount}`, measureId: mId, type: 'whole', view: 'rest' }
      nList.push(node)
      noteCount++
      return
    }

    let notes: any = []

    if (!isArray(note)) {
      notes = [note]
    } else {
      notes = note
    }

    if (clef.number) { // 如果元数据存在多种曲谱类型，则根据当前类型做筛选处理
      notes = filter(notes, { staff: Number(clef.number) })
    }

    // 连音
    let slurTotal = 0 // 需合并数量
    let slurMerged = 0 // 已合并数量
    let slurType: SlurType = 'start' // 连音类型

    notes.map((subItem) => {
      let node: Note = { id: `N_${noteCount}`, measureId: mId }

      if (isChord(subItem)) { // 和弦
        const index: number = nList.length - 1 // 取最后一个节点元素
        const lastNode: Note = nList[index]
        const node: Note = setChordNoteProps(lastNode, subItem)
        nList[index] = node
        return
      } else if (isRest(subItem)) { // 休止符
        node = setRestNoteProps(node, subItem)
      } else if (isTabNote(subItem)) { // 单音符
        node = setSingleNoteProps(node, subItem)
      }

      if (hasTie(subItem)) { // 延长音
        node = setNoteTieProps(node, subItem)
      }

      if (hasSlur(subItem)) { // 连音
        slurTotal = subItem['time-modification']['actual-notes']
        slurMerged++

        if (slurMerged === 1) {
          slurType = 'start'
        } else if (slurMerged > 1 && slurMerged < slurTotal) {
          slurType = 'continue'
        } else if (slurMerged === slurTotal) {
          slurType = 'end'
          slurTotal = 0
          slurMerged = 0
        }

        node = setNoteSlurProps(node, subItem, slurType) // 添加延长音属性
      }

      if (isEmpty(node)) { // 异常处理
        return
      }

      // 设置音符时间属性
      const duration = calNoteDuration(node, bpm, bpmUnit)
      node = setNoteTimeProps(node, mDuration, duration)
      mDuration += duration // 累计小节时长

      // 设置音符坐标属性
      node = setNoteCoordProps(node, mWidth)

      // 设置音符尺寸属性
      const width = calNoteWidth(node, minWidth)
      node = setNoteSizeProps(node, width)

      mWidth += width
      totalWidth += width

      // 添加到音符列表
      nList.push(node)
      noteCount++
    })

    // 添加到小节列表
    let m: Measure = {
      id: mId,
      partId,
      bpm,
      beats,
      beatType,
      capo
    }

    m = setMeasureTimeProps(m, totalDuration, mDuration) // 设置小节时间属性
    m = setMeasureSizeProps(m, mWidth) // 设置小节尺寸属性
    mList.push(m)
    totalDuration += mDuration // 总时长
  })

  return {
    measureList: mList,
    noteList: nList,
    totalWidth,
    totalDuration
  }
}
