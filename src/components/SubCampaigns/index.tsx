import { Add } from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import AdsList from 'components/AdsList'
import SubCampaignCard from 'components/SubCampaignCard'
import { useCallback, useEffect, useState } from 'react'

type Props = {
  subCampaigns: SubCampaignType[]
  onAddSubCampaign: () => void
  onChange: (name: string, index: number, value: string | boolean) => void
}

const SubCampaigns = ({ subCampaigns, onAddSubCampaign, onChange }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [currentSubCampaign, setCurrentSubCampaign] = useState<SubCampaignType>(
    subCampaigns?.[0]
  )

  useEffect(() => {
    const currentSubCampaign = subCampaigns?.find(
      (_subCampaign: SubCampaignType, idx: number) => idx === currentIndex
    )
    if (currentSubCampaign) {
      setCurrentSubCampaign(currentSubCampaign)
    }
  }, [currentIndex, subCampaigns])

  const handleClickSubCampaignCard = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  return (
    <div>
      <Button
        sx={{ display: 'flex', marginLeft: 'auto', marginBottom: '30px' }}
        variant="contained"
        endIcon={<Add />}
        onClick={() => {
          setCurrentIndex(subCampaigns?.length)
          onAddSubCampaign()
        }}
      >
        Thêm chiến dịch con
      </Button>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          marginBottom: '30px',
        }}
      >
        {subCampaigns?.map((subCampaign: SubCampaignType, index: number) => {
          return (
            <SubCampaignCard
              key={index}
              name={subCampaign?.name}
              countOfAds={19}
              status={subCampaign?.status}
              active={currentIndex === index}
              onClickSubCampaignCard={() => handleClickSubCampaignCard(index)}
            />
          )
        })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          gap: '100px',
          marginBottom: '30px',
        }}
      >
        <TextField
          label="Tên chiến dịch con"
          required
          variant="standard"
          sx={{ width: '70%' }}
          value={currentSubCampaign?.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentSubCampaign((prev: SubCampaignType) => ({
              ...prev,
              name: event.target.value,
            }))
            onChange('name', currentIndex, event.target.value)
          }}
          // helperText={error}
          // error={error === '' ? false : true}
          // value={campaignInformation?.name}
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          //   onChange('name', event.target.value)
          // }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={currentSubCampaign?.status}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCurrentSubCampaign((prev: SubCampaignType) => ({
                  ...prev,
                  status: event.target.checked,
                }))
                onChange('status', currentIndex, event.target.checked)
              }}
            />
          }
          label="Đang hoạt động"
        />
      </Box>
      <AdsList adsList={currentSubCampaign?.ads} />
    </div>
  )
}

export default SubCampaigns
