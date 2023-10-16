import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

type Props = {
  name: string
  countOfAds: number
  status: boolean
}

const SubCampaignCard = (props: Props) => {
  const { name, countOfAds, status } = props
  return (
    <Card
      sx={{
        minWidth: '200px',
        minHeight: '100px',
        padding: '10px 20px',
        fontSize: '20px',
        fontWeight: '500',
        boxShadow: '2',
        cursor: 'pointer',
      }}
      variant="outlined"
    >
      <Box
        sx={{
          display: ' flex',
          justifyContent: 'center',
          alignItems: ' center',
          gap: '4px',
        }}
      >
        <p style={{ marginTop: '0px', marginBottom: '0px' }}>{name}</p>
        <CheckCircleIcon sx={{ color: status ? 'green' : 'gray' }} />
      </Box>
      <p>{countOfAds}</p>
    </Card>
  )
}

export default SubCampaignCard
