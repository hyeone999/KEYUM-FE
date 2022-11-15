import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  Image,
  Platform,
} from 'react-native';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
// import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';

import KeyumTypo from '../../resource/image/KeyumLOGOTYPO_1.png';
import testGif from '../../resource/image/testGif.gif';

const signInWithKakao = async (): Promise<void> => {
  const token: KakaoOAuthToken = await login();

  console.log(JSON.stringify(token));
};

const naverLogin = async (): Promise<void> => {
  console.log('dd');
  const token: NaverLoginResponse = await NaverLogin.login(info);
  console.log(token);
};
const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId:
      '702679288927-s3riqhj1pv7uvc4vlnhp5o8823mqjpkh.apps.googleusercontent.com',
  });
};

const onGoogleButtonPress = async () => {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

const signOutWithKakao = async (): Promise<void> => {
  const message = await logout();

  // setResult(message);
};

//   const getKakaoProfile = async (): Promise<void> => {
//     const profile: KakaoProfile = await getProfile();

//     setResult(JSON.stringify(profile));
//   };

const unlinkKakao = async (): Promise<void> => {
  const message = await unlink();

  // setResult(message);
};

const info: NaverLoginRequest = {
  appName: 'keyum',
  consumerKey: 'emLJacIpqC1VGarFjLHx',
  consumerSecret: 'z_Q_8LbpiI',
};

const androidKeys = {
  kConsumerKey: 'emLJacIpqC1VGarFjLHx',
  kConsumerSecret: 'z_Q_8LbpiI',
  kServiceAppName: 'keyum',
};
const appName = 'keyum';
const consumerSecret = 'z_Q_8LbpiI';
const consumerKey = 'emLJacIpqC1VGarFjLHx';
const serviceUrlScheme = 'navertest';
const initials = Platform.OS === 'ios' ? '' : androidKeys;

export default function Login({navigation}) {
  const [success, setSuccessResponse] = React.useState(null);

  // const [failure, setFailureResponse] =
  //   useState<NaverLoginResponse['failureResponse']>();
  const [naverToken, setNaverToken] = React.useState(null);

  React.useEffect(() => {
    googleSigninConfigure();
  });
  // const getNaverUserProfile = async () => {
  //   const profileResult = await getProfile(naverToken.accessToken);
  //   if (profileResult.resultcode === "024") {
  //     Alert.alert("로그인 실패", profileResult.message);
  //     return;
  //   }
  //   console.log("profileResult", profileResult);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image source={KeyumTypo} />
      </View>
      <FastImage // 임시 GIF
        style={{width: 250, height: 250}}
        source={testGif}
      />

      <TouchableOpacity onPress={signInWithKakao} style={styles.btnKakao}>
        <Text style={styles.btnText}>카카오로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnGoogle}
        onPress={() => onGoogleButtonPress()}>
        <Text style={styles.btnText}>구글로 시작하기</Text>
      </TouchableOpacity>
      <Button
        title="닉네임 설정 (임시 구현)"
        onPress={() => navigation.push('NickName')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    width: '100%',
    fontSize: 70,
    textAlign: 'center',
  },
  imgView: {
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 40,
  },
  btnKakao: {
    backgroundColor: '#FFF62B',
    fontWeight: 'bold',
    padding: 10,
    margin: 15,
    marginTop: 50,
    width: '60%',
  },
  btnGoogle: {
    backgroundColor: '#E4E4E4',
    fontWeight: 'bold',
    padding: 10,
    margin: 15,
    marginTop: 50,
    width: '60%',
  },
  btnText: {
    color: '#000',
    fontSize: 15,
    textAlign: 'center',
  },
});
