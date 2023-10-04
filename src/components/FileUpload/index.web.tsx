import React from 'react'
import { Controller } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'

import { useSnackBar } from '#hooks/ui'
import { translate } from '#utils'
import { useTheme } from 'styled-components/native'

import { Container, Text, Visibility } from '#cmp'

import { IFileUploadProps, IFileEventProps } from './types'

const FileUploadComponent = ({
  name = 'file',
  label,
  title,
  subtitle,
  control
}: IFileUploadProps) => {
  const { colors } = useTheme()
  const { showSnackbar } = useSnackBar()

  const handleFileSelection = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.DragEvent<HTMLDivElement>,
    onChange: (e: IFileEventProps | undefined) => void
  ) => {
    event.preventDefault()
    const selectedFile =
      'dataTransfer' in event
        ? event.dataTransfer?.files?.[0]
        : event.target?.files?.[0]

    if (selectedFile) {
      const allowedExtensions = /\.(png|jpe?g|pdf)$/i
      if (!allowedExtensions.test(selectedFile.name)) {
        showSnackbar(
          translate('screen.store_forms.form.attachment.validation.extension'),
          'danger'
        )
        return
      }
      const maxSize = 25 * 1024 * 1024
      if (selectedFile.size > maxSize) {
        showSnackbar(
          translate('screen.store_forms.form.attachment.validation.max'),
          'danger'
        )
        return
      }
      const name = selectedFile.name.toLowerCase().replace(/\s/g, '')
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onload = () => {
        const base64 = reader.result?.toString() ?? ''
        onChange?.({ ...selectedFile, base64, name })
      }
    }
  }

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const fileInput = window.document.getElementById('file-input')
      if (fileInput) {
        fileInput.click()
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <Container>
      <Text fontSize="md" fontWeight="700" pb={1} raw>
        {label}
      </Text>
      <Controller
        name={name}
        defaultValue={null}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div
            style={{
              borderWidth: value.name ? 0 : 1,
              borderRadius: 5,
              borderStyle: 'dashed',
              backgroundColor: colors.white,
              marginBottom: 32
            }}
            onDragOver={handleDragOver}
            onDrop={event => handleFileSelection(event, onChange)}
          >
            <TouchableOpacity onPress={handleClick}>
              <input
                type="file"
                accept=".png,.jpeg,.jpg,.pdf"
                size={25600}
                id="file-input"
                onChange={event => handleFileSelection(event, onChange)}
                style={{ display: 'none' }}
              />
              <Visibility.Root>
                <Visibility.Default>
                  <Text fontSize="sm" textAlign="center" py={10}>
                    {title}
                  </Text>
                  <Text fontSize="sm" textAlign="center" pb={16}>
                    {subtitle}
                  </Text>
                </Visibility.Default>
                <Visibility.Case condition={!!value.name}>
                  <Text
                    color={value.name ? colors.gray[700] : colors.black}
                    fontSize="lg"
                    textAlign="center"
                    py={10}
                  >
                    {value.name}
                  </Text>
                </Visibility.Case>
              </Visibility.Root>
            </TouchableOpacity>
          </div>
        )}
      />
    </Container>
  )
}

export default FileUploadComponent
