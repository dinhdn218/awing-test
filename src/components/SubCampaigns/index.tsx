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

type Props = {
  subCampaigns: any
  onAddSubCampaign: () => void
}

const SubCampaigns = ({ subCampaigns, onAddSubCampaign }: Props) => {
  // const handleAddSubCampaign = useCallback(() => {
  //   setSubCampaigns((prev: any) => {
  //     return [...prev, ...initData]
  //   })
  // }, [])

  console.log(subCampaigns)

  return (
    <div>
      <Button
        sx={{ display: 'flex', marginLeft: 'auto', marginBottom: '30px' }}
        variant="contained"
        endIcon={<Add />}
        onClick={onAddSubCampaign}
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
        {subCampaigns?.map((subCampaign: any, index: number) => {
          return (
            <SubCampaignCard
              key={index}
              name={
                index !== 0
                  ? `${subCampaign?.name} ${index + 1}`
                  : subCampaign?.name
              }
              countOfAds={19}
              status={subCampaign?.status}
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
          // helperText={error}
          // error={error === '' ? false : true}
          // value={campaignInformation?.name}
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          //   onChange('name', event.target.value)
          // }}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Đang hoạt động"
        />
      </Box>
      <AdsList />
    </div>
  )
}

export default SubCampaigns
