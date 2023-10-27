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
import { useCallback, useState } from 'react'

type Props = {
  subCampaigns: SubCampaignType[]
  onAddSubCampaign: () => void
  onAddAds: (subCampaignIndex: number) => void
  onChangeSubCampaign: (
    name: string,
    index: number,
    value: string | boolean
  ) => void
  onChangeAds: (
    name: string,
    subCampaignIndex: number,
    adsIndex: number,
    value: string | number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  onDelete: (subCampaignIndex: number, adsIndex: number[]) => void
}

const SubCampaigns = ({
  subCampaigns,
  onAddSubCampaign,
  onChangeSubCampaign,
  onAddAds,
  onChangeAds,
  onDelete,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

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
            (accumulator: number, currentValue: AdsType) => {
              if (Number.isNaN(Number(currentValue?.quantity))) {
                return 0
              }
              const result = accumulator + Number(currentValue?.quantity)
              return result
            },
            0
          )

          const isHaveErrorInAdsList = subCampaign?.ads?.some(
            (ads: AdsType) =>
              ads?.name?.trim() === '' || !ads?.quantity || ads?.quantity === 0
          )

          return (
            <SubCampaignCard
              key={index}
              name={subCampaign?.name}
              countOfAds={totalAds}
              status={subCampaign?.status}
              active={currentIndex === index}
              onClickSubCampaignCard={() => handleClickSubCampaignCard(index)}
              isHaveErrorInAdsList={isHaveErrorInAdsList}
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
            onChangeSubCampaign('name', currentIndex, event.target.value)
          }}
          error={
            subCampaigns?.[currentIndex]?.name?.trim() === '' ? true : false
          }
          helperText={
            subCampaigns?.[currentIndex]?.name?.trim() === ''
              ? 'Không được để trống'
              : ''
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={subCampaigns?.[currentIndex]?.status}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChangeSubCampaign(
                  'status',
                  currentIndex,
                  event.target.checked
                )
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
        onDelete={onDelete}
      />
    </div>
  )
}

export default SubCampaigns
