import { isArray, isObject } from 'lodash'
import { Note, NoteData, NoteXML } from '../../types'
import getChordName from './getChordName'

/**
 * 生成和弦音符
 */
export default function setChordNoteProps(note: Note, noteXML: NoteXML): Note {
  const { notations } = noteXML

  if (!isObject(notations) || !notations.technical || !note.data) {
    return note
  }

  const { fret, string } = notations.technical
  const nodeData = { string, fret } // MusicXML的string是从1开始

  if (note.view === 'chord' && isArray(note.data)) { // 如果前一个节点是和弦类型，则直接做添加处理
    note.data = [...note.data, nodeData]
    note.name = getChordName(note.data)
    return note
  }

  let data: NoteData[] = []
  if (isArray(note.data)) {
    data = [...note.data, nodeData]
  } else if (isObject(note.data)) {
    data = [note.data, nodeData]
  }

  return {
    ...note,
    view: 'chord',
    data
  }
}
