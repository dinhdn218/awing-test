import { Box, Button, Tab, Tabs } from '@mui/material'
import CustomTabPanel from 'components/CustomTabPanel'
import Information from 'components/Information'
import SubCampaigns from 'components/SubCampaigns'
import React, {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import './App.css'
import { Send } from '@mui/icons-material'

const initData: CampaignType = {
  information: {
    name: '',
    describe: '',
  },

  subCampaigns: [
    {
      name: 'Chiến dịch con 1',
      status: true,
      ads: [
        {
          name: 'Quảng cáo 1',
          quantity: 0,
        },
      ],
    },
  ],
}

function App() {
  const [value, setValue] = useState<number>(1)
  const [data, setData] = useState<CampaignType>(initData)

  const [error, setError] = useState<any>({
    campaignName: '',
  })

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const onClick = useCallback(() => {
    if (data?.information?.name?.trim() === '') {
      setError((prev: any) => ({
        ...prev,
        campaignName: 'Không được để trống!!!',
      }))
      alert('Vui lòng điền đúng và đầy đủ thông tin!!')
      return
    }
    alert('Thêm thành công chiến dịch ' + JSON.stringify(data))
  }, [data])

  const handleChangeCampaignInformation = useCallback(
    (name: string, value: string) => {
      setData((prev: CampaignType) => ({
        ...prev,
        information: {
          ...prev.information,
          [name]: value,
        },
      }))

      if (name === 'name') {
        if (value?.trim() !== '') {
          setError((prev: any) => ({
            ...prev,
            campaignName: '',
          }))
        } else {
          setError((prev: any) => ({
            ...prev,
            campaignName: 'Không được để trống!!!',
          }))
        }
      }
    },
    []
  )

  const handleAddSubCampaign = useCallback(() => {
    setData((prev: CampaignType) => {
      return {
        ...prev,
        subCampaigns: [
          ...prev?.subCampaigns,
          {
            name: `Chiến dịch con ${prev.subCampaigns.length + 1}`,
            status: true,
            ads: [
              {
                name: 'Quảng cáo 1',
                quantity: 0,
              },
            ],
          },
        ],
      }
    })
  }, [])

  // console.log(data)

  const handleChangeSubCampaign = useCallback(
    (name: string, index: number, value: string | boolean) => {
      setData((prev: CampaignType) => {
        const subCampaignChanged = prev.subCampaigns.find(
          (_subCampaign: SubCampaignType, idx: number) => idx === index
        )
        if (subCampaignChanged) {
          const newSubCampaigns = prev.subCampaigns.fill(
            { ...subCampaignChanged, [name]: value },
            index,
            index + 1
          )
          return {
            ...prev,
            subCampaigns: newSubCampaigns,
          }
        } else {
          return prev
        }
      })
    },
    []
  )

  const handleAddAds = useCallback((subCampaignIndex: number) => {
    setData((prev: CampaignType) => {
      const subCampaignChanged = prev.subCampaigns.find(
        (_subCampaign: SubCampaignType, idx: number) => idx === subCampaignIndex
      )
      if (subCampaignChanged) {
        const newSubCampaigns = prev.subCampaigns.fill(
          {
            ...subCampaignChanged,
            ads: [
              ...prev.subCampaigns?.[subCampaignIndex].ads,
              {
                name: `Quảng cáo ${
                  prev.subCampaigns?.[subCampaignIndex].ads.length + 1
                }`,
                quantity: 0,
              },
            ],
          },
          subCampaignIndex,
          subCampaignIndex + 1
        )
        return {
          ...prev,
          subCampaigns: newSubCampaigns,
        }
      } else {
        return prev
      }
    })
  }, [])

  const handleChangeAds = useCallback(() => {}, [])

  return (
    <div className="App">
      <Button
        type="submit"
        sx={{
          marginTop: '16px',
          marginLeft: 'auto',
          display: 'flex',
          marginRight: '16px',
        }}
        variant="contained"
        onClick={onClick}
        endIcon={<Send />}
      >
        Submit
      </Button>
      <Box
        sx={{
          width: 'full',
          typography: 'body1',
          border: 1,
          m: 2,
          borderColor: 'divider',
          borderRadius: '4px',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="lab API tabs example"
          >
            <Tab label="Thông tin" value={1} />
            <Tab label="Chiến dịch con" value={2} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={1}>
          <Information
            campaignInformation={data?.information}
            error={error?.campaignName}
            onChange={handleChangeCampaignInformation}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <SubCampaigns
            subCampaigns={data?.subCampaigns}
            onAddSubCampaign={handleAddSubCampaign}
            onChange={handleChangeSubCampaign}
            onAddAds={handleAddAds}
            onChangeAds={handleChangeAds}
          />
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default App
