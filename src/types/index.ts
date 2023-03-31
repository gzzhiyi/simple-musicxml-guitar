// Note's type string type
export type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32th' | '64th' | '128th' | '256th' | '512th' | '1024th'

// Note's view type
export type NoteView = 'single' | 'chord' | 'rest'

// Dot's type type
export type DotType = 'dot' | 'doubleDot' | ''

// Slur type type
export type SlurType = 'start' | 'continue' | 'end'

// Tie type type
export type TieType = 'start' | 'continue' | 'stop'

// Measure XML type
export interface MeasureXML {
  _number?: string
  note?: NoteXML[]
  harmony?: HarmonyXML | HarmonyXML[]
  [propName: string]: any
}

// Note XML type
export interface NoteXML {
  type: NoteType
  notations?: {
    technical: {
      fret: number
      string: number
    }
    tied?: {
      _type: TieType
    }
  }
  [propName: string]: any
}

// Harmony XML type
export interface HarmonyXML {
  frame: {
    'first-fret': number
    'frame-note': {
      string: number
      fret: number
    }
  }
  [propName: string]: any
}

// Clef type
export interface Clef {
  line?: number
  sign?: string
  number?: string
}

// Harmony type
export interface Harmony {
  firstFret: number
  name: string
  data: {
    string: number
    fret: number
  }
}

// 音符数据
export interface NoteData {
  string: number
  fret: number
}

// 时间属性
export interface TimeProps {
  start: number // 开始时间（毫秒）
  duration: number // 持续时间（毫秒）
}

// 连音属性
export interface SlurProps {
  type: SlurType
  actualNotes: number
  normalNotes: number
}

// 延长音属性
export interface TieProps {
  type: TieType
}

// 小节
export interface Measure {
  id: string
  partId: string
  bpm: number
  beats: number
  beatType: number
  capo: number
  time?: TimeProps
}

// 音符
export interface Note {
  id: string
  measureId: string
  type?: NoteType
  name?: string // 音符名称（和弦）
  view?: NoteView // 音符显示类型
  data?: NoteData | NoteData[]
  dot?: DotType
  slur?: SlurProps
  tie?: TieProps
  time?: TimeProps
}
