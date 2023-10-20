import { Box, Stack, TextField } from '@mui/material'

type Props = {
  campaignInformation: InformationType
  error: string
  onChange: (name: string, value: string) => void
}

const Information = ({ campaignInformation, error, onChange }: Props) => {
  return (
    <Box>
      <Stack direction="column" spacing={2}>
        <TextField
          label="Tên chiến dịch"
          required
          helperText={error}
          error={error === '' ? false : true}
          value={campaignInformation?.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange('name', event.target.value)
          }}
        />{' '}
        <TextField
          label="Mô tả"
          value={campaignInformation?.describe}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange('describe', event.target.value)
          }}
        />
      </Stack>
    </Box>
  )
}

export default Information
