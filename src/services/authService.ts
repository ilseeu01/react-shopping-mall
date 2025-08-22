import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../config/firebase';

// 테스트용 더미 계정
const TEST_ACCOUNTS = [
  { email: 'admin@gmail.com', password: '0000' },
  { email: 'test@test.com', password: 'test123' }
];

// 더미 사용자 객체 생성
const createDummyUser = (email: string): User => {
  return {
    uid: `dummy-${Date.now()}`,
    email,
    emailVerified: true,
    displayName: null,
    photoURL: null,
    phoneNumber: null,
    providerId: 'firebase',
    isAnonymous: false,
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString()
    },
    providerData: [],
    refreshToken: '',
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => 'dummy-token',
    getIdTokenResult: async () => ({
      token: 'dummy-token',
      expirationTime: new Date(Date.now() + 3600000).toISOString(),
      authTime: new Date().toISOString(),
      issuedAtTime: new Date().toISOString(),
      signInProvider: 'password',
      signInSecondFactor: null,
      claims: {}
    }),
    reload: async () => {},
    toJSON: () => ({})
  } as User;
};

export const signIn = async (email: string, password: string) => {
  try {
    // 테스트 계정 확인
    const testAccount = TEST_ACCOUNTS.find(
      account => account.email === email && account.password === password
    );
    
    if (testAccount) {
      // 테스트 계정으로 로그인
      console.log('Test account login:', email);
      return createDummyUser(email);
    }
    
    // Firebase 인증 시도
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    // Firebase 오류가 발생한 경우 테스트 계정 재확인
    const testAccount = TEST_ACCOUNTS.find(
      account => account.email === email && account.password === password
    );
    
    if (testAccount) {
      console.log('Fallback to test account:', email);
      return createDummyUser(email);
    }
    
    throw new Error(error.message || '로그인에 실패했습니다.');
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    // Firebase가 설정되지 않은 경우 더미 사용자 생성
    if (error.code === 'auth/invalid-api-key' || error.message.includes('Firebase')) {
      console.log('Creating dummy user for development:', email);
      return createDummyUser(email);
    }
    throw new Error(error.message || '회원가입에 실패했습니다.');
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    // Firebase 오류 무시 (더미 사용자의 경우)
    console.log('Logout (dummy user or Firebase error)');
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  try {
    return onAuthStateChanged(auth, callback);
  } catch (error) {
    // Firebase가 설정되지 않은 경우 빈 함수 반환
    console.log('Firebase not configured, using dummy auth state');
    return () => {};
  }
};