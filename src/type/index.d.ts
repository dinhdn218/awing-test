type InformationType = {
  name: string
  describe?: string
}

type AdsType = {
  name: string
  quantity: number
}

type SubCampaignType = {
  name: string
  status: boolean
  ads: AdsType[]
}

type CampaignType = {
  information: InformationType
  subCampaigns: SubCampaignType[]
}
