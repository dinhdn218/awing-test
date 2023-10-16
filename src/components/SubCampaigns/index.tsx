import { Add } from '@mui/icons-material'
import { Box, Button, Card } from '@mui/material'
import { Campaign } from 'App'
import React, { useCallback, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SubCampaignCard from 'components/SubCampaignCard'

const initData = [
  {
    name: 'Chiến dịch con',
    status: true,
    ads: [
      {
        name: 'Quảng cáo',
        quantity: 0,
      },
    ],
  },
]

const SubCampaigns = () => {
  const [subCampaigns, setSubCampaigns] = useState(initData)

  const handleAddSubCampaign = useCallback(() => {
    setSubCampaigns((prev: any) => {
      return [...prev, ...initData]
    })
  }, [])

  console.log(subCampaigns)

  return (
    <div>
      <Button
        sx={{ display: 'flex', marginLeft: 'auto' }}
        variant="contained"
        endIcon={<Add />}
        onClick={handleAddSubCampaign}
      >
        Add
      </Button>
      <Box sx={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
        {subCampaigns?.map((subCampaign, index: number) => {
          return (
            <SubCampaignCard
              name={`${subCampaign?.name} ${index + 1}`}
              countOfAds={19}
              status={subCampaign?.status}
            />
          )
        })}
      </Box>
    </div>
  )
}

export default SubCampaigns
