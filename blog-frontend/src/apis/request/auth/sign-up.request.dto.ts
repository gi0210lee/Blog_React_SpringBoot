export default interface ISignUpRequestDto {
  email: string;
  password: string;
  nickname: string;
  telNumber: string;
  address: string;
  addressDetail: string | null;
  agreedPersonal: boolean;
}
