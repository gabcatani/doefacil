import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging'

type ICbActionHandler = (action: any) => void //eslint-disable-line

export const setupFirebaseMessaging = async (
  cbActionHandler: ICbActionHandler
) => {
  const authStatus = await messaging().requestPermission()

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    createNotificationListeners(cbActionHandler)
  } else {
    // TODO: trackear que o usuário não deu permissão de notificação
  }
}

type IActionMessageControllerProps = {
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
  cbActionHandler: ICbActionHandler
}

const actionMessageController = ({
  remoteMessage,
  cbActionHandler
}: IActionMessageControllerProps) => {
  cbActionHandler(remoteMessage.data?.action ?? '')
}

const createNotificationListeners = async (
  cbActionHandler: ICbActionHandler
) => {
  messaging().onMessage(async remoteMessage => {
    if (remoteMessage) {
      console.log('Message show in use!', remoteMessage)
    }
  })

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (remoteMessage) {
      console.log('Message in background!', remoteMessage)
    }
  })

  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage) {
      console.log('Message open app in Background', remoteMessage)

      actionMessageController({ remoteMessage, cbActionHandler })
    }
  })

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification open closed app', remoteMessage)

        actionMessageController({ remoteMessage, cbActionHandler })
      }
    })
}
