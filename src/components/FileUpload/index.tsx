import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import DocumentPicker, {
  DocumentPickerResponse,
  types
} from 'react-native-document-picker'
import RNFS from 'react-native-fs'

import { useSnackBar } from '#hooks/ui'
import { translate } from '#utils'

import { Container, Text, Visibility } from '#cmp'

import { IFileUploadProps } from './types'

const FileUploadComponent = ({
  label,
  title,
  subtitle,
  control,
  name
}: IFileUploadProps) => {
  const { showSnackbar } = useSnackBar()

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const pickDocument = async () => {
          try {
            setIsLoading(true)
            if (DocumentPicker.pickSingle) {
              const { uri, name, size }: DocumentPickerResponse =
                await DocumentPicker.pickSingle({
                  presentationStyle: 'fullScreen',
                  type: [types.pdf, types.images]
                })
              const maxSize = 25 * 1024 * 1024
              if (size! > maxSize) {
                showSnackbar(
                  translate(
                    'screen.store_forms.form.attachment.validation.max'
                  ),
                  'danger'
                )
                return
              }
              const fileContent = await RNFS.readFile(uri, 'base64')
              const base64 = `data:image;base64,${fileContent}`
              onChange({
                name,
                base64
              })
            }
          } catch (e) {
            if (DocumentPicker.isCancel(e)) {
              return
            } else {
              showSnackbar(
                translate(
                  'screen.store_forms.form.attachment.validation.extension'
                ),
                'danger'
              )
              return
            }
          } finally {
            setIsLoading(false)
          }
        }
        return (
          <>
            <Text fontSize="md" fontWeight="700" pb={1}>
              {label}
            </Text>
            <Container
              borderWidth={1}
              borderRadius={5}
              borderStyle="dashed"
              borderColor="black"
              mb={32}
            >
              <Container>
                <TouchableOpacity onPress={pickDocument}>
                  <Visibility.Root>
                    <Visibility.Default>
                      <Container py={10}>
                        <Text fontSize="sm" textAlign="center">
                          {title}
                        </Text>
                        <Text fontSize="xs" textAlign="center">
                          {subtitle}
                        </Text>
                      </Container>
                    </Visibility.Default>
                    <Visibility.Case condition={isLoading}>
                      <ActivityIndicator />
                    </Visibility.Case>
                    <Visibility.Case condition={!!value?.name}>
                      <Text fontSize="md" textAlign="center" py={12}>
                        {value?.name}
                      </Text>
                    </Visibility.Case>
                  </Visibility.Root>
                </TouchableOpacity>
              </Container>
            </Container>
          </>
        )
      }}
    />
  )
}

export default FileUploadComponent
