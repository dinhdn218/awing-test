import { Add } from '@mui/icons-material'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'

type Props = {
  adsList: AdsType[]
}

function createData(name: string, quantity: number) {
  return { name, quantity }
}

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
]

const AdsList = ({ adsList }: Props) => {
  return (
    <Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginBottom={'30px'}
      >
        <Typography variant="h6" textTransform={'uppercase'}>
          Danh sách quảng cáo
        </Typography>
        <Button variant="contained" endIcon={<Add />}>
          Thêm quảng cáo
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Tên quảng cáo</TableCell>
              <TableCell align="left">Số lượng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AdsList
