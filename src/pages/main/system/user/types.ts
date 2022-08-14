type spansT = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
interface IBths {
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    text: string
    event: () => void
    icon: string
}
export interface IDataPageT {
    search?: {
        spans?: {
            [prop in spansT]: number
        }
        formItems: object[]
    }
    button: {
        size?: 'large' | 'default' | 'small'
        btns: IBths[]
    }
    table: {
        'highlight-current-row'?: boolean
        columns: []
    }
}

export interface IPorps {
    pageMap: string[]
    opstion: IDataPageT
}
