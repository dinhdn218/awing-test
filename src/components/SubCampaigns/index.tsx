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
  onAddAds: (subCampaignIndex: number) => void
  onChange: (name: string, index: number, value: string | boolean) => void
  onChangeAds: (name: string, index: number, value: string | boolean) => void
}

const SubCampaigns = ({
  subCampaigns,
  onAddSubCampaign,
  onChange,
  onAddAds,
  onChangeAds,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  console.log({ subCampaigns })

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
          const totalAds = subCampaign?.ads?.reduce(
            (accumulator, currentValue) => {
              const result = accumulator + currentValue?.quantity
              return result
            },
            0
          )

          return (
            <SubCampaignCard
              key={index}
              name={subCampaign?.name}
              countOfAds={totalAds}
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
          value={subCampaigns?.[currentIndex]?.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
              checked={subCampaigns?.[currentIndex]?.status}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange('status', currentIndex, event.target.checked)
              }}
            />
          }
          label="Đang hoạt động"
        />
      </Box>
      <AdsList
        adsList={subCampaigns?.[currentIndex]?.ads}
        onAddAds={onAddAds}
        onChangeAds={onChangeAds}
        currentSubCampaignIndex={currentIndex}
      />
    </div>
  )
}

export default SubCampaigns
