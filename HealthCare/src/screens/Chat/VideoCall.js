import React, {useEffect, useState} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TextInputContainer from '../../components/VideoCallComponent/TextInputContainer';
import IO from 'socket.io-client';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
// import InCallManager from 'react-native-incall-manager';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconContainer from '../../components/VideoCallComponent/IconContainer';
import SliderMenu from '../../components/VideoCallComponent/SlideMenu/EndCallMenu';
import MoreMenu from '../../components/VideoCallComponent/SlideMenu/moreMenu';
import ChatHeader from '../../components/VideoCallComponent/Messages/ChatHeader';
import ChatInput from '../../components/VideoCallComponent/Messages/ChatInput';
import MessagesList from '../../components/VideoCallComponent/Messages/MessageList';

const HOST_URL = `https://advance-video-call.glitch.me`;

export default function App() {
  const [localStream, setlocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [type, setType] = useState('JoinScreen');
  const [localMicOn, setlocalMicOn] = useState(true);
  const [localWebcamOn, setlocalWebcamOn] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [myname, setMyName] = useState('');
  const [socketInstance, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  let connections = [];

  const peerConnectionConfig = {
    iceServers: [
      {urls: 'stun:stun.l.google.com:19302'},
      {urls: 'stun:stun1.l.google.com:19302'},
      {urls: 'stun:stun2.l.google.com:19302'},
      {urls: 'stun:stun3.l.google.com:19302'},
      {urls: 'stun:stun4.l.google.com:19302'},
    ],
  };

  const gotRemoteStream = (stream, id) => {
    setRemoteStreams(prevState => {
      let arrIndex = prevState.findIndex(v => v.id === id);
      if (arrIndex === -1) {
        return [...prevState, {id: id, stream: stream}];
      }
      return [...prevState];
    });
  };

  const gotMessageFromServer = (fromId, message, socket) => {
    //Parse the incoming signal
    var signal = JSON.parse(message);

    //Make sure it's not coming from yourself
    if (fromId != socket.id) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type == 'offer') {
              connections[fromId]
                .createAnswer()
                .then(description => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        'signal',
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        }),
                      );
                    })
                    .catch(e => console.log(e));
                })
                .catch(e => console.log(e));
            }
          })
          .catch(e => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch(e => console.log(e));
      }
    }
  };

  useEffect(() => {
    console.log('remoteStreams', remoteStreams.length);
  }, [remoteStreams]);

  useEffect(() => {
    if (localStream) {
      const socket = IO(HOST_URL);
      setSocket(socket);

      socket.emit('join-room', roomName, myname);
      socket.on('signal', (fromId, message) => {
        gotMessageFromServer(fromId, message, socket);
      });

      socket.on('connect_error', err => {
        console.log(`connect_error due to ${err.message}`);
      });
      socket.on('connect', () => {
        console.log('connected');

        socket.on('user-joined', (id, clients, username) => {
          if (id !== socket.id) {
            // show notification
            console.log(`${username} joined the meeting`);

            setTimeout(() => {
              socket.emit('message', {isMuted: !localMicOn});
              socket.emit('message', {isVideoMuted: !localWebcamOn});
            }, 1000);
          }

          clients.forEach(socketListId => {
            if (!connections[socketListId]) {
              connections[socketListId] = new RTCPeerConnection(
                peerConnectionConfig,
              );

              //Wait for their ice candidate
              connections[socketListId].onicecandidate = event => {
                if (event.candidate != null) {
                  console.log('SENDING ICE');
                  socket.emit(
                    'signal',
                    socketListId,
                    JSON.stringify({ice: event.candidate}),
                  );
                }
              };

              connections[socketListId].ontrack = ev => {
                gotRemoteStream(ev.streams[0], socketListId);
              };

              localStream.getTracks().forEach(track => {
                connections[socketListId].addTrack(track, localStream);
              });
            }
          });

          //Create an offer to connect with your local description

          if (clients.length >= 2) {
            connections[id].createOffer().then(description => {
              connections[id]
                .setLocalDescription(description)
                .then(() => {
                  socket.emit(
                    'signal',
                    id,
                    JSON.stringify({sdp: connections[id].localDescription}),
                  );
                })
                .catch(e => console.log(e));
            });
          }
        });
      });

      socket.on('user-left', (id, username) => {
        console.log('user-left', id);
        let streamsArr = remoteStreams.filter(v => v.id !== id);
        setRemoteStreams(streamsArr);
        // show notification
        console.log(`${username} left the meeting`);
      });

      socket.on('endCallForAll', () => {
        endCall();
      });

      socket.on('createMessage', (message, id) => {
        const isLeft = socket.id === id;
        setMessages(prevState => [...prevState, {isLeft, ...message}]);
      });

      socket.on('broadcast-message', (id, message, username) => {
        if (message.hasOwnProperty('isMuted')) {
          if (message.isMuted) {
            console.log('Audio Muted', id);
          } else {
            console.log('Audio UnMuted', id);
          }
        } else if (message.hasOwnProperty('isVideoMuted')) {
          if (message.isVideoMuted) {
            console.log('video off', id);
          } else {
            console.log('video on', id);
          }
        } else if (message.hasOwnProperty('isScreenShare')) {
          if (message.isScreenShare) {
            console.log('screenshare started', id);
          } else {
            console.log('screenshare stopped', id);
          }
        }
      });

      return () => {
        socket.off('connect');
        socket.off('signal');
        socket.off('user-joined');
        socket.off('user-left');
        socket.off('endCallForAll');
      };
    }
  }, [localStream]);

  const startCall = () => {
    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            mandatory: {
              minWidth: 500,
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          setlocalStream(stream);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  useEffect(() => {
    /*
    InCallManager.start();
    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);

    return () => {
      InCallManager.stop();
    };
    */
    // setType('WEBRTC_ROOM');
    // startCall()
  }, []);

  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => {
      track._switchCamera();
    });
  };

  const toggleMediaStream = (type, state) => {
    localStream.getTracks().forEach(track => {
      if (track.kind === type) {
        // eslint-disable-next-line no-param-reassign
        track.enabled = !state;
      }
    });
  };

  const toggleMic = () => {
    socketInstance.emit('message', {isMuted: localMicOn});
    toggleMediaStream('audio', localMicOn);
    setlocalMicOn(prev => !prev);
  };

  const toggleCamera = () => {
    socketInstance.emit('message', {isVideoMuted: localWebcamOn});
    toggleMediaStream('video', localWebcamOn);
    setlocalWebcamOn(prev => !prev);
  };

  const endCall = () => {
    socketInstance.disconnect();
    connections = [];
    setRoomName('');
    setMessages([]);
    setRemoteStreams([]);
    setlocalStream(null);
    setType('JoinScreen');
  };

  const endCallForAll = () => {
    socketInstance.emit('endCallForAll', '');
    endCall();
  };

  const ChatScreen = () => {
    const onSendMsg = msg => {
      socketInstance.emit('messagesend', {name: myname, content: msg});
    };

    return (
      <View style={{flex: 1}}>
        <ChatHeader
          username={myname}
          picture={''}
          onPress={() => {
            setType('WEBRTC_ROOM');
          }}
        />
        <MessagesList messages={messages} />
        <ChatInput onSendIconClick={onSendMsg} />
      </View>
    );
  };

  const JoinScreen = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          backgroundColor: '#050A0E',
          justifyContent: 'center',
          paddingHorizontal: 42,
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View
              style={{
                backgroundColor: '#1A1C22',
                padding: 40,
                marginTop: 25,
                justifyContent: 'center',
                borderRadius: 14,
              }}>
              <TextInputContainer
                placeholder={'Enter Your name'}
                value={myname}
                setValue={text => {
                  setMyName(text);
                }}
                // keyboardType={'number-pad'}
              />
              <TextInputContainer
                placeholder={'Enter Room Name'}
                value={roomName}
                setValue={text => {
                  setRoomName(text);
                }}
                // keyboardType={'number-pad'}
              />
              <TouchableOpacity
                onPress={() => {
                  if (roomName && myname) {
                    setType('WEBRTC_ROOM');
                    startCall();
                  }
                }}
                style={{
                  height: 50,
                  backgroundColor: '#5568FE',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  marginTop: 16,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                  }}>
                  Join
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

  const WebrtcRoomScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#050A0E',
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        {localStream ? (
          <RTCView
            objectFit={'cover'}
            style={{flex: 1, backgroundColor: '#050A0E'}}
            streamURL={localStream.toURL()}
          />
        ) : null}
        {remoteStreams.map(v => {
          if (!v.stream) {
            return null;
          }
          return (
            <RTCView
              key={v.id}
              objectFit={'cover'}
              style={{
                flex: 1,
                backgroundColor: '#050A0E',
                marginTop: 8,
              }}
              streamURL={v.stream.toURL()}
            />
          );
        })}

        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <SliderMenu onEndCall={endCall} onEndForCall={endCallForAll} />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={!localMicOn ? '#fff' : 'transparent'}
            onPress={() => {
              toggleMic();
            }}
            Icon={() => {
              return localMicOn ? (
                <MaterialCommunityIcons name='microphone' color='white' size={25} />
              ) : (
                <MaterialCommunityIcons name='microphone-off' color='white' size={25} />
              );
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={!localWebcamOn ? '#fff' : 'transparent'}
            onPress={() => {
              toggleCamera();
            }}
            Icon={() => {
              return localWebcamOn ? (
                <MaterialCommunityIcons name='video' color='white' size={25} />
              ) : (
                <MaterialCommunityIcons name='video-off' color='white' size={25} />
              );
            }}
          />

          <MoreMenu
            onCameraSwitch={switchCamera}
            onShareScreen={() => {
              Alert.alert('Info', 'share screen clicked');
            }}
            onChatClick={() => {
              setType('Chat');
            }}
            onAddParticipantClick={() => {
              Alert.alert('Info', 'invite participant clicked');
            }}
          />
        </View>
      </View>
    );
  };

  switch (type) {
    case 'JoinScreen':
      return JoinScreen();
    case 'WEBRTC_ROOM':
      return WebrtcRoomScreen();
    case 'Chat':
      return ChatScreen();
    default:
      return null;
  }
}
