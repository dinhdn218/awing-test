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

export type Campaign = {
  information: {
    name: string
    describe?: string
  }

  subCampaigns: [
    {
      name: string
      status: boolean
      ads: [
        {
          name: string
          quantity: number
        }
      ]
    }
  ]
}

const initData: Campaign = {
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
  const [data, setData] = useState<Campaign>(initData)
  const [error, setError] = useState<any>({
    campaignName: '',
  })

  const onSubmit = (event: BaseSyntheticEvent) => {
    // event.preventDefault()
    console.log({ event })
    // const result: Campaign = {
    //   information: {
    //     name: data.campaignName,
    //     describe: data.campaignDescription,
    //   },
    //   subCampaigns: [
    //     {
    //       name: '',
    //       status: true,
    //       ads: [
    //         {
    //           name: 'string',
    //           quantity: 1,
    //         },
    //       ],
    //     },
    //   ],
    // }
    // alert('Thêm thành công chiến dịch ' + JSON.stringify(result))
  }

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
      setData((prev: Campaign) => ({
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
    console.log('add')
    // setData((prev: Campaign) => ({
    //   ...prev,
    //   subCampaigns: [
    //     ...prev?.subCampaigns,
    //     {
    //       name: 'Chiến dịch con',
    //       status: true,
    //       ads: [
    //         {
    //           name: 'Quảng cáo',
    //           quantity: 0,
    //         },
    //       ],
    //     },
    //   ],
    // }))
    setData((prev: any) => {
      console.log(prev)
      return {
        ...prev,
        subCampaigns: [
          ...prev?.subCampaigns,
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
        ],
      }
    })
  }, [])

  console.log(data)

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
          />
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default App
