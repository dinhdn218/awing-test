import { Add } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import React, { useCallback, useEffect } from 'react'

// Table head
interface Data {
  name: string
  quantity: number
  action: any
}

interface HeadCell {
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Tên quảng cáo *',
  },
  {
    id: 'quantity',
    numeric: true,
    label: 'Số lượng *',
  },
  {
    id: 'action',
    numeric: false,
    label: '',
  },
]

interface EnhancedTableProps {
  numSelected: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            width={headCell.id === 'action' ? '100px' : 'auto'}
            key={headCell.id}
          >
            <>{headCell.label}</>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

// Table toolbar

interface EnhancedTableToolbarProps {
  numSelected: number
  onAddAds: () => void
  currentSubCampaignIndex: number
  selected: number[]
  onDelete: (subCampaignIndex: number, adsIndex: number[]) => void
  callBackResetSelected: () => void
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    numSelected,
    onAddAds,
    currentSubCampaignIndex,
    selected,
    onDelete,
    callBackResetSelected,
  } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} bản ghi được chọn
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', textTransform: 'uppercase' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Danh sách quảng cáo
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Xoá bản ghi được chọn">
          <IconButton
            onClick={() => {
              onDelete(currentSubCampaignIndex, selected)
              callBackResetSelected()
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          onClick={onAddAds}
          sx={{ flexShrink: '0' }}
          variant="contained"
          endIcon={<Add />}
        >
          Thêm quảng cáo
        </Button>
      )}
    </Toolbar>
  )
}

type Props = {
  adsList: AdsType[]
  onAddAds: (currentSubCampaignIndex: number) => void
  onChangeAds: (
    name: string,
    subCampaignIndex: number,
    adsIndex: number,
    value: string | number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  currentSubCampaignIndex: number
  onDelete: (subCampaignIndex: number, adsIndex: number[]) => void
}

const AdsList = ({
  adsList,
  onAddAds,
  onChangeAds,
  currentSubCampaignIndex,
  onDelete,
}: Props) => {
  const [selected, setSelected] = React.useState<number[]>([])
  const [disabledDeleleRow, setDisabledDeleleRow] =
    React.useState<boolean>(false)

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = adsList.map((ads, index) => index)
        setSelected(newSelected)
        return
      }
      setSelected([])
    },
    [adsList]
  )

  const callBackResetSelected = useCallback(() => {
    setSelected([])
  }, [])

  useEffect(() => {
    setDisabledDeleleRow(selected?.length > 0)
  }, [selected?.length])

  const handleClick = (event: React.MouseEvent<unknown> | any, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleAddAds = useCallback(() => {
    onAddAds(currentSubCampaignIndex)
  }, [currentSubCampaignIndex, onAddAds])

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  return (
    <Box
      sx={{ borderColor: 'divider', borderStyle: 'solid', borderWidth: '1px' }}
    >
      <EnhancedTableToolbar
        numSelected={selected.length}
        onAddAds={handleAddAds}
        currentSubCampaignIndex={currentSubCampaignIndex}
        selected={selected}
        onDelete={onDelete}
        callBackResetSelected={callBackResetSelected}
      />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={adsList.length}
          />
          <TableBody>
            {adsList.map((ads, index) => {
              const isItemSelected = isSelected(index)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={index}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                      onClick={(event) => handleClick(event, index)}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      required
                      variant="standard"
                      sx={{ width: '100%' }}
                      value={ads?.name}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        onChangeAds(
                          'name',
                          currentSubCampaignIndex,
                          index,
                          event.target.value,
                          event
                        )
                      }}
                      error={ads?.name?.trim() === '' ? true : false}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      inputProps={{ inputMode: 'numeric' }}
                      required
                      variant="standard"
                      sx={{ width: '100%' }}
                      value={ads?.quantity}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        onChangeAds(
                          'quantity',
                          currentSubCampaignIndex,
                          index,
                          event.target.value,
                          event
                        )
                      }}
                      error={
                        !ads?.quantity || Number(ads?.quantity) === 0
                          ? true
                          : false
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Xoá">
                      <IconButton
                        disabled={disabledDeleleRow}
                        onClick={() => {
                          setSelected([])
                          onDelete(currentSubCampaignIndex, [index])
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AdsList
