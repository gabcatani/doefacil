import { Control } from 'react-hook-form'

interface IFileUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, object>
  name: string
  label: string
  title: string
  subtitle: string
}

interface IFileEventProps extends File {
  name: string
  base64: string
}

export type { IFileUploadProps, IFileEventProps }
