import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid'
import { localeText } from './localeText'

export interface CuzomTableProps {
  columns: GridColumns<any>
  rows: Array<any>
}

const CuzomTable = ({ columns, rows }: CuzomTableProps) => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      getRowId={(row) => row._id}
      localeText={localeText}
      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-gray-200' : '')}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  )
}

export default CuzomTable
