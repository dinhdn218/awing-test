import { Box, Card, Typography } from '@mui/material'
import React, { BaseSyntheticEvent } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

type Props = {
  name: string
  countOfAds: number
  status: boolean
  active: boolean
  onClickSubCampaignCard: () => void
}

const SubCampaignCard = (props: Props) => {
  const { name, countOfAds, status, active, onClickSubCampaignCard } = props
  return (
    <Card
      sx={{
        minWidth: '200px',
        minHeight: '100px',
        padding: '10px 20px',
        fontSize: '20px',
        fontWeight: '500',
        cursor: 'pointer',
        textAlign: 'center',
        borderColor: active ? '#1976d2' : '',
        borderWidth: '2px',
      }}
      variant="outlined"
      onClick={onClickSubCampaignCard}
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
